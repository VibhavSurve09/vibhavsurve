use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use mongodb::{bson::doc, options::ClientOptions, Client};
use std::io;
mod models;
#[get("/")]
async fn ping() -> impl Responder {
    HttpResponse::Ok().json("pong")
}
#[actix_web::main]
async fn main() -> io::Result<()> {
    println!("Hello, world!");
    HttpServer::new(|| App::new().service(ping))
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
