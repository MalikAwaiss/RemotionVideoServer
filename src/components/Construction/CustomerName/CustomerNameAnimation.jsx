import React from "react"
import colors from "../../../constants/colors"
import TextWrapper from "../../../shared/TextWrapper"

export default ({name}) => {
    
    return(
        <TextWrapper 
            customContainerStyle={{
                bottom: 260,
                left: 120,
            }}
            customFontStyle={{
                fontSize:135,
                fontWeight: 'bold',
                color: colors.white
            }}
            text={name+','}
        />
    )
}