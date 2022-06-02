use actix_web::{get, post, web, Responder};
use serde::{Deserialize, Serialize};
pub struct Service {
    icon: String,
    name: String,
    about: String,
    id: u8,
}

// impl Service {
//     #[get("/whatido")]
//     async fn get_all_service() -> impl Responder {
//         todo!("Get All service")
//     }

//     async fn create_service() -> impl Responder {
//         todo!("Create A service")
//     }
// }
