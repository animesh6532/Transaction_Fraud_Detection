<div align="center">

# 💳 Transaction Fraud Detection System

### ⚡ End-to-End Machine Learning System for Intelligent Fraud Prediction

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=24&duration=2500&pause=1000&color=00F7FF&center=true&vCenter=true&width=900&lines=Machine+Learning+for+Fraud+Detection;FastAPI+Backend+%2B+Frontend+Integration;Real-Time+Transaction+Prediction;AI-Powered+Risk+Analysis+System" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-111111?style=for-the-badge&logo=python"/>
  <img src="https://img.shields.io/badge/FastAPI-111111?style=for-the-badge&logo=fastapi"/>
  <img src="https://img.shields.io/badge/Scikit--Learn-111111?style=for-the-badge&logo=scikitlearn"/>
  <img src="https://img.shields.io/badge/Frontend-111111?style=for-the-badge&logo=javascript"/>
  <img src="https://img.shields.io/badge/Machine%20Learning-111111?style=for-the-badge"/>
</p>

</div>

---

# 📌 Overview

**Transaction Fraud Detection System** is an end-to-end **Machine Learning + Web Integration** project built to identify whether a financial transaction is **fraudulent** or **legitimate**.

The system combines:

* **Data preprocessing**
* **Fraud classification modeling**
* **FastAPI backend deployment**
* **Frontend interaction**
* **Real-time prediction flow**

This project is designed to simulate a **production-style fraud detection pipeline** where users can input transaction details and receive fraud predictions instantly.

---

# 🎯 Problem Statement

Financial fraud is one of the most critical challenges in digital transactions. Fraudulent transactions are often:

* **rare**
* **hard to detect**
* **hidden among legitimate transactions**
* **high-impact when missed**

The goal of this project is to use **Machine Learning** to identify suspicious transaction behavior and classify fraud patterns effectively.

---

# 🧠 Project Objective

The main objective of this project is to build a system that can:

* detect fraud based on transaction patterns
* process and transform raw financial data
* serve predictions through an API
* provide an interface for real-time interaction
* simulate a practical ML deployment workflow

---

# 🏗️ System Architecture

```text
User Input / Transaction Data
            │
            ▼
   Frontend Interface
            │
            ▼
      FastAPI Backend
            │
            ▼
 Preprocessing + Scaling Layer
            │
            ▼
 Trained Fraud Detection Model
            │
            ▼
 Fraud / Legitimate Prediction
```

---

# ✨ Key Features

* 🔍 **Fraud Detection Prediction**
* ⚙️ **FastAPI Backend Integration**
* 🌐 **Frontend User Interface**
* 📊 **Data Preprocessing Pipeline**
* 🧠 **Trained ML Model**
* ⚡ **Real-Time Prediction Flow**
* 🧪 **Notebook-Based Experimentation**
* 📦 **Saved Model + Scaler + Column Artifacts**

---

# 🧰 Tech Stack

## 💻 Languages

* Python
* JavaScript
* HTML
* CSS

## ⚙️ Backend

* FastAPI

## 🤖 Machine Learning / Data Science

* Scikit-learn
* Pandas
* NumPy
* Jupyter Notebook

## 📁 Model Artifacts

* `fraud_model.pkl`
* `scaler.pkl`
* `columns.json`
* `numerical_cols.json`

---

# 📂 Project Structure

```bash
Transaction_Fraud_Detection/
│
├── backend_api/              # FastAPI backend
├── fraud-frontend/           # Frontend UI
├── fraud_model.pkl           # Trained ML model
├── scaler.pkl                # Saved feature scaler
├── columns.json              # Feature columns
├── numerical_cols.json       # Numerical feature metadata
├── Untitled-1.ipynb          # Model experimentation notebook
└── README.md
```

---

# ⚙️ Workflow

## 1️⃣ Data Processing

* Raw transaction data is cleaned and transformed
* Relevant features are selected
* Numerical values are scaled for model input

## 2️⃣ Model Training

* Fraud classification model is trained using processed transaction data
* Fraud and legitimate transactions are learned through supervised ML workflow

## 3️⃣ Model Serialization

* Trained model and preprocessing artifacts are saved for deployment

## 4️⃣ API Deployment

* FastAPI serves the fraud prediction endpoint

## 5️⃣ Frontend Integration

* Users interact through the frontend UI and receive prediction output

---

# 🚀 How to Run the Project

## 1. Clone the repository

```bash
git clone https://github.com/animesh6532/Transaction_Fraud_Detection.git
cd Transaction_Fraud_Detection
```

---

## 2. Create a virtual environment

```bash
python -m venv venv
```

### Activate it:

**Windows**

```bash
venv\Scripts\activate
```

**Mac/Linux**

```bash
source venv/bin/activate
```

---

## 3. Install dependencies

```bash
pip install -r requirements.txt
```

> If `requirements.txt` is not yet complete, install manually based on your environment.

---

## 4. Run the FastAPI backend

```bash
cd backend_api
uvicorn main:app --reload
```

> If your FastAPI entry file has a different name, replace `main:app` accordingly.

---

## 5. Run the frontend

Open the frontend folder and launch the interface based on your frontend setup.

Example:

```bash
cd fraud-frontend
```

Then run it according to your frontend structure.

---

# 📡 Example Use Case

A user enters transaction details through the frontend such as:

* transaction amount
* transaction type
* account behavior / related fields
* transaction-related attributes

The system:

1. preprocesses the data
2. scales the required features
3. sends it to the trained model
4. returns a prediction:

```text
Prediction: Fraudulent Transaction
```

or

```text
Prediction: Legitimate Transaction
```

---

# 📈 Why This Project Matters

This project is valuable because it demonstrates:

* practical **Machine Learning deployment**
* **backend + ML integration**
* use of **saved preprocessing artifacts**
* ability to move from **notebook to usable application**
* real-world understanding of **fraud detection systems**

It is not just a model — it is a **system-oriented ML application**.

---

# 🔥 Future Improvements

Planned upgrades for this project:

* 📊 Add model performance dashboard
* ☁️ Deploy backend and frontend online
* 🔐 Add user authentication / access control
* 📈 Add probability / confidence score
* 🧠 Improve fraud explainability
* 🧪 Compare multiple ML models
* 🐳 Dockerize the full project

---

# 🙌 Author

## **Animesh Sahoo**

AI/ML Developer | Software Developer | Backend Builder

* 🌐 Portfolio: [animesh6532.netlify.app](https://animesh6532.netlify.app/)
* 💼 LinkedIn: [linkedin.com/in/animesh-sahoo-b03151302](https://linkedin.com/in/animesh-sahoo-b03151302)
* 🐙 GitHub: [github.com/animesh6532](https://github.com/animesh6532)

---

<div align="center">

### ⚡ Turning Machine Learning into Real-World Systems ⚡

</div>
