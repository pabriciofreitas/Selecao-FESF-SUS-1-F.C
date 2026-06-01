from fastapi import APIRouter

from app.schemas.auth_schema import GoogleAuthResponse
from app.services.auth_service import google_auth_mock

router = APIRouter(prefix="/api", tags=["auth"])


@router.post("/auth/google", response_model=GoogleAuthResponse)
def post_google_auth() -> GoogleAuthResponse:
    return google_auth_mock()
