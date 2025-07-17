from gradio_client import Client
import requests

# Init client
client = Client("aronsaras/stabilityai-stable-diffusion-3.5-large")

# Panggil predict
result = client.predict(
    prompt="Astronaut in a jungle, ultra realistic",
    negative_prompt="low quality, blurry",
    seed=0,
    randomize_seed=True,
    width=1024,
    height=1024,
    guidance_scale=7.5,
    num_inference_steps=20,
    api_name="/infer"
)

# result adalah tuple (info dict, seed)
info = result[0]
image_url = info["url"]

print("✅ Generated image URL:", image_url)

# Download image
response = requests.get(image_url)
response.raise_for_status()

# Simpan ke lokal
with open("generated_image.png", "wb") as f:
    f.write(response.content)

print("🎉 Image saved as generated_image.png")
