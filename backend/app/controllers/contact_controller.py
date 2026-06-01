from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.connection import get_db
from app.schemas.contact_schema import ContactResponse
from app.services.contact_service import list_contacts

router = APIRouter(prefix="/api", tags=["contacts"])


@router.get("/contatos", response_model=list[ContactResponse])
def get_contacts(db: Session = Depends(get_db)) -> list[ContactResponse]:
    contacts = list_contacts(db)
    return [ContactResponse(name=contact.name, phone=contact.phone) for contact in contacts]
