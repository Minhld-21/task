import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors, Sizes, parseSize } from '~theme';
import LabelView from '~shared/components/Label/LabelView';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

const Index = (props) => {
    const { titleLabel, maxLength, value, changeText, returnKeyType, editable, styleContainer, styleText, keyboardType, initialHtml } = props;
    const editorRef = useRef(null); // Tạo một ref cho RichEditor

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setContentHTML(initialHtml); // Đặt nội dung HTML ban đầu
        }
    }, []);

    const handleEditorChange = (html) => {
        changeText(html);
    };

    return (
        <LabelView title={titleLabel} styleLabelView={styleContainer || styles.styleLabelView}>
            <RichToolbar
                editor={editorRef}
                selectedIconTint={'#2095F2'}
                disabledIconTint={'#bfbfbf'}
                iconTint={'#000'}
                onPressAddImage={() => alert('Add Image')}
            />
            <RichEditor
                ref={editorRef} // Gán ref cho RichEditor
                initialContentHTML={initialHtml}
                onChange={handleEditorChange}
            />
        </LabelView>
    );
}

const styles = StyleSheet.create({
    styleLabelView: {
        flex: 1,
        marginTop: parseSize(5),
    },
    wrapInput: {
        borderBottomWidth: Sizes.border,
        borderBottomColor: Colors.border,
        paddingHorizontal: Sizes.padding,
        paddingVertical: Sizes.padding / 4,
        marginHorizontal: Sizes.margin / 4,
    },
    textInput: {
        padding: 0,
        fontFamily: 'Hahmlet-Regular',
        fontSize: 12,
        color: Colors.dark,
    },
});

export default Index;
