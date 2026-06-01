from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.controllers.auth_controller import router as auth_router
from app.controllers.contact_controller import router as contact_router
from app.db.connection import SessionLocal, init_db
from app.services.contact_service import seed_default_contacts


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()
    with SessionLocal() as db:
        seed_default_contacts(db)
    yield


app = FastAPI(title="desafio-backend", lifespan=lifespan)

app.include_router(contact_router)
app.include_router(auth_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
