import React from "react"
import colors from "../../../constants/colors"
import TextWrapper from "../../../shared/TextWrapper"

export default ({amount=''}) => {
    const finalAmount = amount.length < 10 ? amount + new Array((10-amount.length) + 3).join( '_' ) : amount
    return(
        <TextWrapper 
            customContainerStyle={{
                top: 62,
                left: 187,
            }}
            customFontStyle={{
                fontSize:118,
                fontWeight: 'bold',
                color: colors.primary
            }}
            text={finalAmount}
        />
    )
}