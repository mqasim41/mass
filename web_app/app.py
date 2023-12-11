from flask import Flask, render_template, Response
import cv2
import paho.mqtt.client as mqtt
import numpy as np

app = Flask(__name__)

# Global variable to store the latest frame
latest_frame = None

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("detected_image_topic")

def on_message(client, userdata, msg):
    global latest_frame
    print("Received message on topic: "+msg.topic)
    
    # Convert the received bytes back to an image array
    image_array = np.frombuffer(msg.payload, dtype=np.uint8)
    latest_frame = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# Replace 'broker_ip' with the actual IP address of your Mosquitto broker
broker_ip = "34.30.141.4"
client.connect(broker_ip, 1883, 60)
client.subscribe("detected_image_topic")

# Start the MQTT client loop in a separate thread
client.loop_start()

def generate_frames():
    global latest_frame
    while True:
        if latest_frame is not None:
            _, buffer = cv2.imencode('.jpg', latest_frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/')
def index():
    return render_template('web_app/templates/index.html')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
