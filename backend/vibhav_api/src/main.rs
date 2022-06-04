use actix_cors::Cors;
use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};
use dotenv;
use mongodb::{bson::doc, options::ClientOptions, Client};
use std::io;
use std::sync::Mutex;
mod controller;
mod models;

const FRONT_END_URL: &str = "https://vibhavsurve.tech";
#[get("/")]
async fn ping() -> impl Responder {
    HttpResponse::Ok().json("pong")
}
#[actix_web::main]

async fn main() -> io::Result<()> {
    //ClientOptions::parse returns a result type so we use unwrap
    let client_options = ClientOptions::parse(dotenv::var("MONGO_URI").unwrap())
        .await
        .unwrap();
    // Client::parse returns a result type so we use unwrap
    let client = web::Data::new(Mutex::new(Client::with_options(client_options).unwrap()));

    HttpServer::new(move || {
        //CORS
        let cors = Cors::default().allowed_origin(FRONT_END_URL);
        App::new()
            .wrap(cors)
            .app_data(client.clone())
            .service(ping)
            .service(controller::get_all_service)
            .service(controller::get_all_skills)
            .service(controller::get_all_softwares)
            .service(controller::get_all_projects)
    })
    .bind(("127.0.0.1", 8000))?
    .run()
    .await
}
