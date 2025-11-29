import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const type = searchParams.get("type") || "weather";

  if (!city && (!lat || !lon)) {
    return NextResponse.json({ error: "City or Coordinates are required" }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json(
      { error: "Server configuration error: API Key missing" },
      { status: 500 }
    );
  }

  try {
    const endpoint = type === "forecast" ? "forecast" : "weather";
    const params: any = {
      appid: API_KEY,
      units: "metric",
    };

    if (city) {
      params.q = city;
    } else {
      params.lat = lat;
      params.lon = lon;
    }

    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "Failed to fetch weather data";
      return NextResponse.json({ error: message }, { status });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
