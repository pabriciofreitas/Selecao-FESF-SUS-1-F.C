from contextlib import asynccontextmanager
from os import getenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.controllers.auth_controller import router as auth_router
from app.controllers.contact_controller import router as contact_router
from app.db.connection import SessionLocal, init_db
from app.services.contact_service import seed_default_contacts

load_dotenv()


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()
    with SessionLocal() as db:
        seed_default_contacts(db)
    yield


app = FastAPI(title="desafio-backend", lifespan=lifespan)

frontend_url = getenv("FRONTEND_URL", "http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact_router)
app.include_router(auth_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
