## Readme - Thank Greens App - Food Shopping App (Android)

This project is a mobile application built specifically for the Android operating system. It utilizes Expo's managed workflow for React Native development, allowing for a streamlined development experience.

**UI Reference:** https://marvelapp.com/prototype/22eeh796/screens

**Features:**

* **Responsive UI:** The app adapts to different screen sizes, ensuring a smooth user experience on various Android devices.
* **Authentication Flow:** Users can register, login, and manage their profiles.
* **Cart Management:** Users can add, remove, and view items in their cart. The cart updates consistently across all screens, reflecting the latest changes.
* **Checkout with Stripe:** Secure checkout is implemented using Stripe payment intents.
* **Order Management:** Users can view past orders, including details, status, and the ability to cancel orders.
* **Rating System:** Users can rate past orders to provide feedback.
* **Order Status Tracking:** Real-time order status updates keep users informed.
* **Reporting Issues:** Users can report any issues related to their orders.
* **Location-Based Addressing:** Users can easily add their address with location data for a smoother checkout experience.
* **Profile Management:** Users can edit their profile information.
* **Security Features:** Change password and forget password functionalities are included for secure account management.

**Technology Stack:**

* Expo (Managed Workflow) - **Android Focused**
* React Native
* Stripe (Payment Gateway)

**Getting Started:**

1. Clone this repository.
2. Install dependencies: `npm install`
3. Follow Expo's setup guide specific to Android development
4. Start the development server: `npx expo start` or `npm start`
   
**Creating Builds:**

Using EAS Build (Recommended):
*Install the latest EAS CLI: https://docs.expo.dev/eas-update/getting-started/
*Log in to your Expo account using EAS CLI: `eas login`
*Configure your project: Run `eas build --platform android` to configure for Android builds.
*Create a build: Run `eas build` to initiate the build process.

**Additional Notes:**

* This README provides a basic overview. Further documentation for specific functionalities might be included within the codebase.
* Configuration for Stripe and other services might need to be set up separately.

**Development:**

* Feel free to contribute to this project by creating pull requests.
* Follow coding conventions and best practices for React Native development.

**Disclaimer:**

This project is for demonstration purposes only and might require further development for production use.
