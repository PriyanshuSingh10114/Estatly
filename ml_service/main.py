from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import utils

app = FastAPI(title="Estatly ML Service", description="AI Price Predictor API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    location: str
    sqft: float
    bath: int
    bhk: int

@app.on_event("startup")
async def startup_event():
    print("Starting Python FastAPI Server For Home Price Prediction...")
    utils.load_saved_artifacts()

@app.get("/locations")
async def get_locations():
    return {
        'locations': utils.get_location_names()
    }

@app.post("/predict")
async def predict_home_price(request: PredictRequest):
    estimated_price = utils.get_estimated_price(
        request.location,
        request.sqft,
        request.bhk,
        request.bath
    )
    return {
        'predicted_price': estimated_price
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
