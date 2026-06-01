from pydantic import BaseModel


class GoogleAuthResponse(BaseModel):
    name: str
    photoUrl: str
    url: str
