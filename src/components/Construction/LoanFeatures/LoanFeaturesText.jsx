import React from "react"
import colors from "../../../constants/colors"
import TextWrapper from "../../../shared/TextWrapper"

export default ({companyName=''}) => {
    return(
        <TextWrapper 
            customContainerStyle={{
                top: 272,
                right: 15,
                width: '426px'
            }}
            customFontStyle={{
                fontSize:32,
                fontWeight: 200,
                color: colors.white,
                fontFamily: 'montserrat'
            }}
            text={companyName}
        />
    )
}