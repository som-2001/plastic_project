import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
new_image_path = 'C:/Users/somgo/Downloads/plastic_frontend_project/user_frontend/plastic/public/images2/testImage.jpg'

# Load the image
image_size = (150, 150)  # Adjust the target size according to your model
img = image.load_img(new_image_path, target_size=image_size)
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array /= 255.0

# Load the model
reconstructed_model = tf.keras.models.load_model("C:/Users/somgo/Desktop/Ai/model/my_model.h5")

# Make predictions
prediction = reconstructed_model.predict(img_array)
predicted_class = (prediction > 0.8).astype(int)
predicted_class1 = np.argmax(prediction)

print(predicted_class1)
# Print the prediction
if predicted_class[0][0] == 1:
    print("It's plastic!")
else:
    print("It's paper!")
