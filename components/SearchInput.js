import {TextInput, View, StyleSheet} from "react-native";
import React from "react";

export default class SearchInput extends React.Component {

    state = {
        text: '',
    };

    handleChangeText = text => {
        this.setState({ text });
    };

    handleSubmitEditing = () => {
        const { onSubmit } = this.props;
        const { text } = this.state;

        if (!text) return;

        onSubmit(text);
        this.setState({ text: '' });
    };

    render() {

        const { placeholder } = this.props;
        const { text } = this.state;

        return (
            <View style={styles.container}>
                <TextInput
                    autoCorrect={false}
                    placeholder={placeholder}
                    value={text}
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'
                    style={styles.textInput}
                    clearButtonMode='always'
                    onChangeText={this.handleChangeText}
                    onSubmitEditing={this.handleSubmitEditing}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        backgroundColor: '#666',
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: 300,
        marginTop: 20,
        alignSelf: 'center',
    },
    textInput: {
        flex: 1,
        color: 'white',
    },
});

SearchInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};
