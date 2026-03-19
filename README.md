# CustomerApp

แอป React Native สำหรับจัดการรายการลูกค้า โดยมีความสามารถหลักคือแสดงรายการลูกค้า, ค้นหา, ดูรายละเอียด, แก้ไขข้อมูลพื้นฐาน และเปลี่ยนสถานะลูกค้า (`active` / `inactive`)

## ภาพรวมเทคโนโลยี

- React Native 0.84.1
- React 19
- TypeScript
- React Navigation Native Stack
- Zustand สำหรับ state management
- Jest สำหรับ unit tests

## การติดตั้งโปรเจกต์

ติดตั้ง dependencies หลักของโปรเจกต์:

```bash
npm install
```

dependencies ที่ใช้ในงานนี้:

### Navigation

```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
```

### State Management

```bash
npm install zustand
```

## วิธีรันโปรเจกต์

### 1. เริ่ม Metro Bundler

```bash
npm start
```

### 2. รันบน Android

```bash
npm run android
```

### 3. รันบน iOS

```bash
npm run ios
```

หมายเหตุ:

- ต้องเตรียม environment ของ React Native ให้พร้อมก่อน เช่น Android Studio / Xcode / emulator / device
- สำหรับ iOS อาจต้องติดตั้ง CocoaPods เพิ่มเติมหลัง clone โปรเจกต์

## การรันเทสต์

```bash
npm test
```

ในรีโปนี้มี unit tests สำหรับ `customerService` และ `customerStore`

## โครงสร้างโปรเจกต์

```text
CustomerApp/
|- __tests__/              ชุดทดสอบของ service และ store
|- android/                native Android project
|- ios/                    native iOS project
|- src/
|  |- components/          UI components ที่นำกลับมาใช้ซ้ำได้
|  |- constants/           mock data และค่าคงที่
|  |- hooks/               custom hooks สำหรับเชื่อม UI กับ state
|  |- navigation/          navigation stack และ type ของ route
|  |- screens/             หน้าจอหลักของแอป
|  |- services/            data access layer
|  |- store/               Zustand store
|  |- types/               TypeScript types
|- App.tsx                 entry point ของแอป
|- package.json            scripts และ dependencies
```

หน้าจอหลักในแอป:

- `CustomerListScreen` แสดงรายการลูกค้าและค้นหา
- `CustomerDetailScreen` แสดงรายละเอียดลูกค้าและสลับสถานะ
- `EditCustomerScreen` แก้ไขชื่อและอีเมลของลูกค้า

## Key Technical Decisions

### 1. ใช้ React Navigation แบบ Native Stack

เลือกใช้ `@react-navigation/native` และ `@react-navigation/native-stack` เพราะเหมาะกับ flow แบบหลายหน้าจอที่เรียบง่าย อ่านโค้ดง่าย และจัดการ route parameters ได้ชัดเจนผ่าน TypeScript

### 2. ใช้ Zustand แทน state management ที่ใหญ่กว่า

เลือก Zustand เพราะโปรเจกต์นี้มี state กลางไม่ซับซ้อนมาก เช่น รายการลูกค้า, loading state, refreshing state และ error state จึงไม่จำเป็นต้องเพิ่มความซับซ้อนของ Redux หรือโครงสร้าง boilerplate ขนาดใหญ่

### 3. แยก `service`, `store`, `hooks`, `screens`

โครงสร้างนี้ช่วยให้แต่ละ layer มีหน้าที่ชัดเจน:

- `services` รับผิดชอบการเข้าถึงข้อมูล
- `store` รับผิดชอบ state กลางและ business actions
- `hooks` ช่วยลด logic ที่ซ้ำในหน้าจอ
- `screens` โฟกัสกับการแสดงผลและ interaction

### 4. ใช้ mock data และ simulated delay

ข้อมูลลูกค้าถูกเก็บใน `mockData.ts` และจำลอง delay ใน `customerService` เพื่อทำให้ behavior ใกล้เคียงการเรียก API จริง เช่น loading, pull-to-refresh และการอัปเดตสถานะ

### 5. ใช้ TypeScript type กลางสำหรับ customer

มีการกำหนด `Customer`, `CustomerStatus` และ `UpdateCustomerPayload` ไว้ชัดเจนเพื่อลดความผิดพลาดจากข้อมูลไม่ตรงรูปแบบ และทำให้ navigation/store/service ใช้สัญญาข้อมูลชุดเดียวกัน

## Assumptions และ Trade-offs

### Assumptions

- แอปนี้ยังไม่ได้เชื่อม backend จริง และใช้ mock data เป็นแหล่งข้อมูลหลัก
- การแก้ไขข้อมูลลูกค้าจำกัดเฉพาะ `name` และ `email`
- การค้นหาทำบน client side โดยค้นจาก `name` และ `email`
- ข้อมูลที่แก้ไขหรือสลับสถานะจะอยู่ใน memory ระหว่าง runtime ของแอปเท่านั้น

### Trade-offs

- การใช้ mock data ทำให้พัฒนาและทดสอบได้เร็ว แต่ยังไม่สะท้อน edge cases ของ API จริง เช่น network failure หลายรูปแบบ, pagination, authorization
- การเก็บข้อมูลใน memory ทำให้ง่ายต่อการสาธิต flow แต่ข้อมูลจะไม่ persist เมื่อปิดแอปหรือ reload ใหม่
- Zustand ทำให้โค้ดกระชับและเริ่มต้นเร็ว แต่ถ้าโปรเจกต์ขยายใหญ่มากขึ้น อาจต้องจัด module/state slices ให้ชัดขึ้น
- validation ในหน้าแก้ไขครอบคลุมเฉพาะกรณีพื้นฐาน ยังไม่ได้รองรับ business rules ที่ซับซ้อน

## สิ่งที่ทำได้แล้วในตอนนี้

- แสดงรายการลูกค้า
- ค้นหาลูกค้าจากชื่อและอีเมล
- pull-to-refresh
- ดูรายละเอียดลูกค้า
- เปลี่ยนสถานะลูกค้า
- แก้ไขชื่อและอีเมล
- มี unit tests ครอบคลุม service และ store

## ถ้ามีเวลาเพิ่ม จะปรับปรุงอะไรต่อ

- เชื่อมต่อ backend จริงแทน mock data
- เพิ่ม persistence เช่น AsyncStorage หรือ sync กับ API จริง
- เพิ่ม error handling ให้ละเอียดขึ้น เช่น retry, empty state, offline state
- เพิ่ม test coverage ในระดับ component และ screen
- เพิ่ม form validation ให้ครอบคลุมมากขึ้น เช่น duplicate email, trimming, validation rules ตามธุรกิจ
- ปรับ UI/UX เพิ่มเติม เช่น loading skeleton, success feedback หลังบันทึก, confirm dialog ก่อนเปลี่ยนสถานะ
- รองรับ pagination หรือการโหลดข้อมูลจำนวนมาก
- แยก constants/theme/style system ให้ reuse ได้มากขึ้น

## การใช้ AI

ตามข้อกำหนดของ assignment:
ใช้ AI ช่วย generate boilerplate code และ mock data เพื่อประหยัดเวลา แต่ architecture, data flow, และ decision ทุกอย่างเข้าใจและตัดสินใจเองครับ

## หมายเหตุเพิ่มเติม

- เวอร์ชัน Node ที่กำหนดในโปรเจกต์คือ `>= 22.11.0`
- สคริปต์หลักใน `package.json` คือ `start`, `android`, `ios`, `test` และ `lint`
