use actix_web::{get, post, web, HttpResponse, Responder};
use futures::stream::TryStreamExt;
use mongodb::{bson::doc, options::ClientOptions, Client, Collection};
use std::sync::Mutex;
const MONGO_DB: &str = "VibhavDB";
const SERVICE_COLLECTION: &str = "services";
const PROJECT_COLLECTION: &str = "projects";
const SKILL_COLLECTION: &str = "skills";
#[get("/whatido")]
async fn get_all_service(data: web::Data<Mutex<Client>>) -> impl Responder {
    let service_collection: Collection<bson::Document> = data
        .lock()
        .unwrap()
        .database(MONGO_DB)
        .collection(SERVICE_COLLECTION);
    let mut services: Vec<bson::Document> = Vec::new();
    let mut cursor = service_collection.find(None, None).await.unwrap();
    while let Some(service) = cursor.try_next().await.unwrap() {
        services.push(service);
    }
    HttpResponse::Ok().json(services)
}

// async fn create_service() -> impl Responder {
//     todo!("Create A service")
// }
