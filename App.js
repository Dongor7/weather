import React from 'react';

import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';
import { fetchLocationId, fetchWeather } from './utils/api';

import {
    StyleSheet,
    Text,
    Platform,
    KeyboardAvoidingView,
    ImageBackground,
    View,
    ActivityIndicator,
    StatusBar,
} from 'react-native';

export default class App extends React.Component {

    state = {
        loading: false,
        error: false,
        location: '' ,
        temperature: 0,
        weather: '',
    };

    handleUpdateLocation = async city => {
        this.setState({ loading: true }, async () => {

            try {
                const locationId = await fetchLocationId(city);
                const { location, weather, temperature } = await fetchWeather(locationId);

                this.setState({
                    loading: false,
                    error: false,
                    location,
                    weather,
                    temperature,
                });
            } catch (e) {
                this.setState({
                    loading: false,
                    error: true,
                });
            }

        });
    };

    async componentDidMount() {
        await this.handleUpdateLocation('San Francisco');

        this.setState({ weather: 'Clear' }, () => console.log(this.state));
    }

    render() {
        const { loading, error, location, temperature, weather } = this.state;

        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <StatusBar barStyle='light-content'/>

                <ImageBackground
                source={getImageForWeather(weather)}
                style={styles.imageContainer}
                imageStyle={styles.image}
                >

                    <View style={styles.detailsContainer}>

                        <ActivityIndicator animating={loading} color='white' size='large'/>

                        {!loading && (
                            <View>
                                {error && (
                                    <Text styel={[styles.smallText, styles.textStyle]}>
                                        Could not load weather, please try a different city.
                                    </Text>
                                )}

                                {!error && (
                                    <View>
                                        <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
                                        <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
                                        <Text style={[styles.largeText, styles.textStyle]}>{temperature}</Text>
                                    </View>
                                )}

                                <SearchInput
                                    placeholder='Search and city'
                                    onSubmit={this.handleUpdateLocation}
                                />
                            </View>
                        )}

                    </View>

                </ImageBackground>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34495E',
    },
    textStyle: {
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
        color: 'white',
    },
    largeText: {
        fontSize: 44,
    },
    smallText: {
        fontSize: 18,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingHorizontal: 20,
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    }
});
