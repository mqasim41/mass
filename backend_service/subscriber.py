import base64
import paho.mqtt.client as mqtt
import requests
from io import BytesIO
from PIL import Image

# URL of the image
image_url = "https://picsum.photos/200/200"

def download_image(url):
    response = requests.get(url)
    if response.status_code == 200:
        return BytesIO(response.content)
    else:
        return None

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    

def on_message(client, userdata, msg):
    print("Received message on topic: "+msg.topic)
    
    # Open the received image
    image = Image.open(BytesIO(msg.payload))
    
    # Encode the image as base64 JPEG
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    base64_image = base64.b64encode(buffered.getvalue()).decode('utf-8')
    
    
    client.publish("detected_image_topic", base64_image, qos=1)

def publish(client):
    # Download the image
    image_data = download_image(image_url)
    
    if image_data:
        # Publish the downloaded image
        client.publish("input_image_topic", image_data.getvalue(), qos=1)
    else:
        print("Failed to download the image.")

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message


broker_ip = "34.131.138.249"
client.connect(broker_ip, 1883, 60)


client.loop_start()

publish(client)
