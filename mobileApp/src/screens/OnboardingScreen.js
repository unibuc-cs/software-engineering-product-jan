// components
import Swiper from 'react-native-swiper';
import Greeting from "../components/Greeting";
import OnboardingForm from "../components/OnboardingForm";
import Interests from "../components/Interests";
import GetStarted from "../components/GetStarted";

export default function OnboardingScreen() {
    return (
        <Swiper loop={false} activeDotColor='#E49773'>
            <Greeting />
            <OnboardingForm />
            <Interests />
            <GetStarted />
        </Swiper>
    )
}