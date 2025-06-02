async function getPredictedLabel(landmarks) {
  try {
    // Prepare data - flatten landmarks to a 1D array [x1,y1,z1, x2,y2,z2, ...]
    const flatLandmarks = landmarks.flatMap(point => [point.x, point.y, point.z]);

    const response = await fetch("https://gcdolatouvtw.eu-central-1.clawcloudrun.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ landmarks: flatLandmarks }),
    });

    if (!response.ok) {
      console.error("API response error:", response.status);
      return null;
    }

    const data = await response.json();

    // data.gesture will be the predicted gesture string from backend
    // Your mapping:
    // "like" => "up"
    // "dislike" => "down"
    // "stop" => "left"
    // "stop_inverted" => "right"
    // Anything else => null

    switch (data.gesture) {
      case "like":
        return "up";
      case "dislike":
        return "down";
      case "stop":
        return "left";
      case "stop_inverted":
        return "right";
      default:
        return null;
    }
  } catch (error) {
    console.error("Error fetching prediction:", error);
    return null;
  }
}
