<!-- BMICalculator.vue -->
<template>
    <div>
      <label for="weight">{{ texts.weightLabel }} ({{ weight }} kg): </label>
      <input v-model="weight" type="number" id="weight" />
      <input v-model="weight" type="range" min="0" max="180" step="1" id="weightRange" />
  
      <label for="height">{{ texts.heightLabel }} ({{ height }} cm): </label>
      <input v-model="height" type="number" id="height" />
      <input v-model="height" type="range" min="0" max="240" step="1" id="heightRange" />
  
      <label for="age">{{ texts.ageLabel }} ({{ age }} {{ texts.ageUnit }}): </label>
      <input v-model="age" type="number" id="age" />
  
      <div v-if="result !== null" class="ben-number-result">
        <p>{{ texts.resultLabel }} {{ result }}</p>
        <div class="ben-text-result">
          <p>{{ bmiText }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BMI_TEXTS from '/config/texts.json';
  
  export default {
    data() {
      return {
        weight: 0,
        height: 0,
        age: 0,
        result: null,
        bmiText: '',
        texts: BMI_TEXTS,
      };
    },
    watch: {
      weight(newValue, oldValue) {
        this.handleInputChange(newValue, this.height);
      },
      height(newValue, oldValue) {
        this.handleInputChange(this.weight, newValue);
      },
      age(newValue, oldValue) {
        this.handleInputChange(this.weight, this.height);
      },
    },
    methods: {
      handleInputChange(newWeight, newHeight) {
        const weight = parseFloat(newWeight);
        const height = parseFloat(newHeight) / 100; // Convert height to meters
  
        if (weight > 0 && height > 0) {
          this.calculateBMI();
        } else {
          this.result = null;
          this.bmiText = '';
        }
      },
      calculateBMI() {
        const weight = parseFloat(this.weight);
        const height = parseFloat(this.height) / 100; // Convert height to meters
  
        const bmi = weight / Math.pow(height, 2);
        this.result = bmi.toFixed(2);
  
        if (bmi < 16) {
          this.bmiText = BMI_TEXTS.labels.underweight;
        } else if (bmi < 25) {
          this.bmiText = BMI_TEXTS.labels.normalWeight;
        } else if (bmi < 30) {
          this.bmiText = BMI_TEXTS.labels.overweight;
        } else if (bmi < 35) {
          this.bmiText = BMI_TEXTS.labels.obesity1;
        } else if (bmi < 40) {
          this.bmiText = BMI_TEXTS.labels.obesity2;
        } else {
          this.bmiText = BMI_TEXTS.labels.extremeObesity;
        }
      },
    },
  };
  </script>
  
  <style scoped>
    .ben-number-result {
      margin-top: 20px;
    }
  </style>
  