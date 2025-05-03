from fastapi import FastAPI

from app.auth.auth_middleware import AuthMiddleware
from app.routes import (
    customerreviews,
    operatinghours,
    photos,
    reservation,
    reservationslots,
    restaurant,
    table,
    user,
)

app = FastAPI(
    title="FastAPI Backend",
    docs_url="/docs",
)
app.add_middleware(AuthMiddleware)

app.include_router(user.router, prefix="/api", tags=["Users"])
app.include_router(restaurant.router, prefix="/api", tags=["Restaurants"])
app.include_router(operatinghours.router, prefix="/api", tags=["Operating Hours"])
app.include_router(table.router, prefix="/api", tags=["Tables"])
app.include_router(reservationslots.router, prefix="/api", tags=["Reservation Slots"])
app.include_router(customerreviews.router, prefix="/api", tags=["Customer Reviews"])
app.include_router(reservation.router, prefix="/api", tags=["Reservations"])
app.include_router(photos.router, prefix="/api", tags=["Photos"])

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
