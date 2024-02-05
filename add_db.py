import requests
import json
import random

farm_id = [i for i in range(6)]

def add_device():
    
    device_name = ["양액기", "에어컨", "Co2 조절기", "pH 조절기", "난방장치"]
    
    device_id = 0

    for f_id in farm_id:
        for d_name in device_name:
            device = {
                "id": device_id,
                "name": d_name,
                "connection": True,
                "smartFarmId": f_id,
                "power": True
            }
            requests.post('https://assignment-9ac0f-default-rtdb.asia-southeast1.firebasedatabase.app/device.json', json=device)
            device_id += 1
            
if __name__ == '__main__':
    pass