from sqlalchemy import select
from sqlalchemy.orm import Session

from app.entities.contact_entity import Contact


def list_contacts(db: Session) -> list[Contact]:
    return list(db.scalars(select(Contact).order_by(Contact.id)))


def seed_default_contacts(db: Session) -> None:
    has_contacts = db.scalar(select(Contact.id).limit(1))
    if has_contacts is not None:
        return

    db.add_all(
        [
            Contact(name="João Silva", phone="+55 11 98888-1111"),
            Contact(name="Marina Costa", phone="+55 21 97777-2222"),
            Contact(name="Paulo Lima", phone="+55 31 96666-3333"),
            Contact(name="Fernanda Alves", phone="+55 41 95555-4444"),
        ]
    )
    db.commit()
