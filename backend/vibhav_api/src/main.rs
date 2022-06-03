use actix_cors::Cors;
use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};
use mongodb::{bson::doc, options::ClientOptions, Client};
use std::io;
use std::sync::Mutex;
mod controller;
mod models;

const FRONT_END_URL: &str = "http://localhost:3000";
#[get("/")]
async fn ping() -> impl Responder {
    HttpResponse::Ok().json("pong")
}
#[actix_web::main]

async fn main() -> io::Result<()> {
    //ClientOptions::parse returns a result type so we use unwrap
    let client_options = ClientOptions::parse(
        "mongodb+srv://vibhav:vibhav123@vs.p2gr6.mongodb.net/?retryWrites=true&w=majority",
    )
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
    })
    .bind(("127.0.0.1", 8000))?
    .run()
    .await
    //use mongodb::{bson::doc, options::ClientOptions, Client};
    // #[tokio::main]
    //     async fn main() -> mongodb::error::Result<()> {
    //         let client_options = ClientOptions::parse(
    //             "mongodb+srv://vibhav:<password>@vs.p2gr6.mongodb.net/?retryWrites=true&w=majority",
    //         )
    //         .await?;
    //         let client = Client::with_options(client_options)?;
    //         let database = client.database("testDB");
    //         Ok(())
    //     }
}
