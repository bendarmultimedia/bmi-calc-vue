<!-- BMICalculator.vue -->
<template>
  <div class="ben-bmi-calculator">
    <el-card class="ben-bmi-calculator__card box-card">
      <template #header>
        <div class="card-header text-dark">
          <span>Kalkulator BMI</span>
        </div>
      </template>
      <el-row :gutter="0">
        <el-col :span="24">
          <label for="weight"
            >{{ texts.weightLabel }} ({{ weight }} kg):
          </label>
          <el-slider
            v-model="weight"
            :min="bmiConfig.weight.min"
            :max="bmiConfig.weight.max"
            show-input
          />
          <!-- @change="calculateBMI" -->
        </el-col>
        <el-col :span="24">
          <label for="height"
            >{{ texts.heightLabel }} ({{ height }} cm):
          </label>
          <el-slider
            v-model="height"
            :min="bmiConfig.height.min"
            :max="bmiConfig.height.max"
            show-input
          />
          <!-- @change="calculateBMI" -->
        </el-col>
      </el-row>
      <el-row :gutter="0" justify="space-between" class="age-row">
        <el-col :span="16"> </el-col>
        <el-col :span="5" class="age-label">
          <label for="age" class="ml-3">{{ texts.ageLabel }}: </label>
        </el-col>
        <el-col :span="3">
          <el-input-number
            v-model="age"
            :min="bmiConfig.age.min"
            :max="bmiConfig.age.max"
            class="age-input"
          />
        </el-col>
      </el-row>

      <el-button @click="calculateBMI">{{ texts.calculateButton }}</el-button>
      <transition name="el-fade-in">
        <div v-if="result != null" class="ben-number-result">
          <p>
            {{ texts.resultLabel }}
            <span :class="['bmi-value', bmiClass]">{{ result }}</span>
          </p>
          <p>{{ texts.labels.yourBMI }}</p>
          <p :class="['ben-text-result', bmiClass]">
            <span class="bmi-result">{{ bmiText }}</span>
          </p>
          <p>
            <strong>{{ texts.tip[bmiStatus] }}</strong>
          </p>
          <p>
            {{ texts.properBMIInAge }}<br>
            <span class="proper-bmi">
                BMI: <span>{{ bmiConfig.ageProperBMIValueRanges[bmiProperRange][0] }}</span> - <span>{{ bmiConfig.ageProperBMIValueRanges[bmiProperRange][1] }}</span>
            </span>
          </p>
        </div>
    </transition>
    <transition name="el-fade-in-linear">
      <NormalWeight v-if="bmiStatus !== ''" />
    </transition>
    
</el-card>
</div>
</template>
<script setup>
/* <transition name="el-fade-in-linear">
  <Starvation v-if="bmiStatus == 'starvation'" />
</transition>
<transition name="el-fade-in-linear">
  <Emaciation v-if="bmiStatus == 'emaciation'" />
</transition>
<transition name="el-fade-in-linear">
  <Underweight v-if="bmiStatus == 'underweight'" />
</transition>
<transition name="el-fade-in-linear">
  <Overweight v-if="bmiStatus == 'overweight'" />
</transition>
<transition name="el-fade-in-linear">
  <Obesity1 v-if="bmiStatus == 'obesity1'" />
</transition>
<transition name="el-fade-in-linear">
  <Obesity2 v-if="bmiStatus == 'obesity2'" />
</transition>
<transition name="el-fade-in-linear">
  <ExtremeObesity v-if="bmiStatus == 'extremeObesity'" />
</transition> */
/* import Starvation from "/src/components/descriptions/Starvation.vue";
import Emaciation from "/src/components/descriptions/Emaciation.vue";
import Underweight from "/src/components/descriptions/Underweight.vue";
import Overweight from "/src/components/descriptions/Overweight.vue";
import Obesity1 from "/src/components/descriptions/Obesity1.vue";
import Obesity2 from "/src/components/descriptions/Obesity2.vue";
import ExtremeObesity from "/src/components/descriptions/ExtremeObesity.vue"; */
import NormalWeight from "/src/components/descriptions/NormalWeight.vue";
const weight = ref(0);
const height = ref(0);
const age = ref(0);
const result = ref(null);
const bmiText = ref("");
const bmiStatus = ref("");
const bmiProperRange = ref("");
const texts = BMI_TEXTS;
const bmiConfig = BMI_CONFIG;

// Set default values using the middleRange method from the mixin
onMounted(() => {
  weight.value = rangeMixin.methods.middleRange(
    bmiConfig.weight.min,
    bmiConfig.weight.max
  );
  height.value = rangeMixin.methods.middleRange(
    bmiConfig.height.min,
    bmiConfig.height.max
  );
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
    bmiText.value = "";
  }
};

const calculateBMI = () => {
  result.value = null;
  const weightVal = parseFloat(weight.value);
  const heightVal = parseFloat(height.value) / 100;

  const bmi = weightVal / Math.pow(heightVal, 2);
  result.value = bmi.toFixed(2);

  bmiStatus.value = checkRangeValue(bmi, bmiConfig.otherBMIRanges);
  bmiProperRange.value = checkRangeValue(age.value, bmiConfig.properBMIAgeRanges);
  console.log(bmiProperRange.value);
  bmiText.value = texts.labels[bmiStatus.value];
};

const checkRangeValue = (value, ranges) => {
  for (const [status, range] of Object.entries(ranges)) {
    const [min, max] = range;

    if (max === undefined) {
      if (value >= min) {
        return status;
      }
    } else {
      if (value >= min && value <= max) {
        return status;
      }
    }
  }

  return null; // Return null if the BMI value doesn't fall into any range
};

// Use computed property to dynamically calculate the BMI class
const bmiClass = computed(() => {
    return bmiStatus.value;
});
</script>
<script>
import BMI_TEXTS from "/config/texts.json";
import BMI_CONFIG from "/config/bmi.json";
import rangeMixin from "/mixins/math/rangeMixin"; // Adjust the path
import { ref, onMounted, computed } from "vue";

export default {
  mixins: [rangeMixin],
  setup() {
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
      bmiStatus,
    };
  },
};
</script>