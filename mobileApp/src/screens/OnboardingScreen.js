// components
import Swiper from 'react-native-swiper';
import Greeting from "../components/Greeting";
import OnboardingForm from "../components/OnboardingForm";
import Interests from "../components/Interests";
import GetStarted from "../components/GetStarted";
import { Dimensions, ScrollView } from 'react-native';

const height = Dimensions.get("screen").height;

export default function OnboardingScreen() {
    return (
        <ScrollView scrollEnabled={false}>
            <Swiper 
                loop={false} 
                activeDotColor='#E49773' 
                style={{height: height}} 
                paginationStyle={{bottom: height * 0.075}}
            >
                <Greeting />
                <OnboardingForm />
                <Interests />
                <GetStarted />
            </Swiper>
        </ScrollView>
    )
}