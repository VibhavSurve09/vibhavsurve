use actix_web::{get, post, web, HttpResponse, Responder};
use futures::stream::TryStreamExt;
use mongodb::{
    bson::doc,
    options::{ClientOptions, FindOptions},
    Client, Collection,
};
use std::sync::Mutex;
const MONGO_DB: &str = "VibhavDB";
const SERVICE_COLLECTION: &str = "services";
const PROJECT_COLLECTION: &str = "projects";
const SKILL_COLLECTION: &str = "skills";
const SOFTWARES_COLLECTION: &str = "softwares";
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

#[get("/skills")]
async fn get_all_skills(data: web::Data<Mutex<Client>>) -> impl Responder {
    let service_collection: Collection<bson::Document> = data
        .lock()
        .unwrap()
        .database(MONGO_DB)
        .collection(SKILL_COLLECTION);
    let mut skills: Vec<bson::Document> = Vec::new();
    let mut cursor = service_collection.find(None, None).await.unwrap();
    while let Some(skill) = cursor.try_next().await.unwrap() {
        skills.push(skill);
    }
    HttpResponse::Ok().json(skills)
}

#[get("/softwares")]
async fn get_all_softwares(data: web::Data<Mutex<Client>>) -> impl Responder {
    let service_collection: Collection<bson::Document> = data
        .lock()
        .unwrap()
        .database(MONGO_DB)
        .collection(SOFTWARES_COLLECTION);
    let mut softwares: Vec<bson::Document> = Vec::new();
    let mut cursor = service_collection.find(None, None).await.unwrap();
    while let Some(software) = cursor.try_next().await.unwrap() {
        softwares.push(software);
    }
    HttpResponse::Ok().json(softwares)
}

#[get("/projects")]
async fn get_all_projects(data: web::Data<Mutex<Client>>) -> impl Responder {
    let service_collection: Collection<bson::Document> = data
        .lock()
        .unwrap()
        .database(MONGO_DB)
        .collection(PROJECT_COLLECTION);
    let mut projects: Vec<bson::Document> = Vec::new();
    let find_options: FindOptions = FindOptions::builder().sort(doc! {"date":-1}).build();
    let mut cursor = service_collection.find(None, find_options).await.unwrap();
    while let Some(project) = cursor.try_next().await.unwrap() {
        projects.push(project);
    }
    HttpResponse::Ok().json(projects)
}

// Post methods are not implemented
