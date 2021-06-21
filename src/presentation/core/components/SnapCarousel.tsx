import React, { PropsWithChildren, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

/*
    Horizontal scrolling carousel with snap effect.

    Originally, we used react-native-snap-carousel, a 3rd party
    library. However, due to performance and usability issues that
    couldn't be solved on time, we decided to build a custom
    solution, simpler but more reliable.

    The implementation is based on
    https://github.com/catalinmiron/react-native-movie-2.0-carousel/blob/master/App.js
*/

const ITEM_WIDTH = Dimensions.get('screen').width * 0.4;

// The "spacer" is used in the algorithm to compute the margins at the
// beggining and end of the list. This is a way of "centering" the carousel.
const SPACER_DUMMY_OBJECT = {};
const SPACER_ITEM_WIDTH = (Dimensions.get('screen').width - ITEM_WIDTH) / 2;

interface ISnapCarouselProps<T> {
    data: Animated.WithAnimatedValue<T | any>[];
    renderItem: (item: T, index: number) => JSX.Element;
    ListFooterComponent?: JSX.Element;
    onEndReached?: () => void;
}

const SnapCarousel = <T,>({
    data,
    renderItem,
    ListFooterComponent,
    onEndReached,
}: PropsWithChildren<ISnapCarouselProps<T>>) => {
    // Keep track of the horizontal scrolling position using an Animated.Value
    // (required to drive the animation of snapping)
    const scrollXAnimatedValue = useRef(new Animated.Value(0)).current;

    // Callback to map events (in this case, scrolling) to Animated.Value's.
    // We map event.nativeEvent.contentOffset.x to scrollXAnimatedValue.
    // useNativeDriver option is required to map horizontal scrolling
    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollXAnimatedValue } } }],
        { useNativeDriver: true },
    );

    // Wrapper renderer around the renderItem() argument
    function animatedRenderItem({ item, index }: { item: T; index: number }) {
        const inputRange = [
            (index - 2) * ITEM_WIDTH,
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
        ];
        const outputRange = [0, -20, 0];

        // Map inputRange to outputRange: Animated.Values's (horizontal scroll
        // positions) to translateY (movement along Y axis)
        const translateY = scrollXAnimatedValue.interpolate({
            inputRange,
            outputRange,
        });

        // The spacer component will apply some "margins" to center the snapped
        // items
        if (item === SPACER_DUMMY_OBJECT) {
            return (
                <View
                    style={{
                        width: SPACER_ITEM_WIDTH,
                    }}
                />
            );
        }

        // Finally, we render the original item applying the computed animation
        return (
            <Animated.View
                style={{ ...styles.container, transform: [{ translateY }] }}>
                {renderItem(item, index)}
            </Animated.View>
        );
    }

    function keyExtractor(_: T, index: number) {
        return index.toString();
    }

    return (
        <Animated.FlatList
            data={[SPACER_DUMMY_OBJECT, ...data, SPACER_DUMMY_OBJECT]}
            horizontal
            keyExtractor={keyExtractor}
            renderItem={animatedRenderItem}
            onEndReached={onEndReached}
            ListFooterComponent={ListFooterComponent}
            snapToInterval={ITEM_WIDTH}
            onScroll={onScroll}
            scrollEventThrottle={16}
            decelerationRate={0.8}
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default SnapCarousel;

const styles = StyleSheet.create({
    container: {
        width: ITEM_WIDTH,
        justifyContent: 'center',
    },
});
