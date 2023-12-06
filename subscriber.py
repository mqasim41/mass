import paho.mqtt.client as mqtt
import cv2
import numpy as np
from io import BytesIO
from PIL import Image

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("image_topic")

def on_message(client, userdata, msg):
    print("Received message on topic: "+msg.topic)
    
    # Perform object detection (replace this with your actual object detection logic)
    image = Image.open(BytesIO(msg.payload))
    # Object detection code here...
    
    # Send the detected image back to a different topic
    client.publish("detected_image_topic", np.array(detected_image).tobytes(), qos=1)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# Replace 'broker_ip' with the actual IP address of your Mosquitto broker
broker_ip = "YOUR_BROKER_IP"
client.connect(broker_ip, 1883, 60)

client.loop_forever()
