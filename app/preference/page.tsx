import Preference from "@/components/Student/preference";

export default function PreferencePage() {
  return <Preference />;
}

// import Preference from "@/components/preference/";
// import { useRouter } from 'next/router'; // Import the useRouter hook

// export default function PreferencePage() {
//     const router = useRouter(); // Initialize the router object

//     // Function to handle navigation to the splash screen
//     const navigateToSplash = () => {
//         router.push('/splash'); // Adjust the path if necessary
//     };

//     return (
//         <div>
//             <Preference />
//             {/* Add a button or some UI element to trigger navigation */}
//             <button onClick={navigateToSplash}>Go to Splash Screen</button>
//         </div>
//     );
// }
