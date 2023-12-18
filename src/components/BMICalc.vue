<!-- BMICalculator.vue -->
<template>
    <div class="ben-bmi-calculator">
      <label for="weight">{{ texts.weightLabel }} ({{ weight }} kg): </label>
      <el-slider v-model="weight" :min="bmiConfig.weight.min" :max="bmiConfig.weight.max" show-input @change="calculateBMI" />
  
      <label for="height">{{ texts.heightLabel }} ({{ height }} cm): </label>
      <el-slider v-model="height" :min="bmiConfig.height.min" :max="bmiConfig.height.max" show-input @change="calculateBMI" />
  
      <label for="age">{{ texts.ageLabel }}: </label>
      <el-input v-model="age" type="number" :min="bmiConfig.age.min" :max="bmiConfig.age.max" />
  
      <div v-if="result !== null" class="ben-number-result">
      <p>{{ texts.resultLabel }} {{ result }}</p>
      <div :class="['ben-text-result', bmiClass]">
        <p>{{ bmiText }}</p>
      </div>
    </div>
  
      <!-- Replace the standard button with Element Plus button -->
      <el-button @click="calculateBMI">{{ texts.calculateButton }}</el-button>
    </div>
  </template>
  
  <script>
import BMI_TEXTS from '/config/texts.json';
import BMI_CONFIG from '/config/bmi.json';
import rangeMixin from '/mixins/math/rangeMixin'; // Adjust the path
import { ref, onMounted, computed } from 'vue';

export default {
  mixins: [rangeMixin],
  setup() {
    const weight = ref(0);
    const height = ref(0);
    const age = ref(0);
    const result = ref(null);
    const bmiText = ref('');
    const texts = BMI_TEXTS;
    const bmiConfig = BMI_CONFIG;

    // Set default values using the middleRange method from the mixin
    onMounted(() => {
      weight.value = rangeMixin.methods.middleRange(bmiConfig.weight.min, bmiConfig.weight.max);
      height.value = rangeMixin.methods.middleRange(bmiConfig.height.min, bmiConfig.height.max);
      age.value = 25;
    //   age.value = rangeMixin.methods.middleRange(bmiConfig.age.min, bmiConfig.age.max) - 20;
    });

    const handleInputChange = (newWeight, newHeight) => {
      const weightVal = parseFloat(newWeight);
      const heightVal = parseFloat(newHeight) / 100;

      if (weightVal > 0 && heightVal > 0) {
        calculateBMI();
      } else {
        result.value = null;
        bmiText.value = '';
      }
    };

    const calculateBMI = () => {
      const weightVal = parseFloat(weight.value);
      const heightVal = parseFloat(height.value) / 100;

      const bmi = weightVal / Math.pow(heightVal, 2);
      result.value = bmi.toFixed(2);

      if (bmi < 16) {
        bmiText.value = texts.labels.underweight;
      } else if (bmi < 25) {
        bmiText.value = texts.labels.normalWeight;
      } else if (bmi < 30) {
        bmiText.value = texts.labels.overweight;
      } else if (bmi < 35) {
        bmiText.value = texts.labels.obesity1;
      } else if (bmi < 40) {
        bmiText.value = texts.labels.obesity2;
      } else {
        bmiText.value = texts.labels.extremeObesity;
      }
    };

    // Use computed property to dynamically calculate the BMI class
    const bmiClass = computed(() => {
      if (result.value < 16) {
        return 'underweight';
      } else if (result.value < 25) {
        return 'normal-weight';
      } else if (result.value < 30) {
        return 'overweight';
      } else if (result.value < 35) {
        return 'obesity1';
      } else if (result.value < 40) {
        return 'obesity2';
      } else {
        return 'extreme-obesity';
      }
    });

    return {
      weight,
      height,
      age,
      result,
      bmiText,
      texts,
      bmiConfig,
      handleInputChange,
      calculateBMI,
      bmiClass,
    };
  },
};
</script>

<style scoped>
  .ben-number-result {
    margin-top: 20px;
  }
</style>