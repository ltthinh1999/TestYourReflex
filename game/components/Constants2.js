import { Dimensions } from 'react-native';

export default Constants = {
    MAX_WIDTH: Dimensions.get("screen").height,
    MAX_HEIGHT: Dimensions.get("screen").width,
    GAP_SIZE: 200, // gap between the two parts of the pipe
    PIPE_WIDTH: 100 // width of the pipe
}