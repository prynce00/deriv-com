import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text, LocalizedLinkText } from 'components/elements'
import { Flex } from 'components/containers'
import { Localize } from 'components/localization'
import { binary_url } from 'common/utility'
import BinaryWhite from 'images/svg/interim/binary-white.svg'
import BinaryBlue from 'images/svg/binary.svg'

const BinaryLink = styled(LocalizedLinkText)`
    &:hover {
        text-decoration: underline;
        color: var(--color-white);
    }
`

const CtaBinary = ({ is_white }) => {
    const color = is_white ? 'white' : 'black'
    return (
        <Flex mt="1.6rem" ai="center">
            {is_white ? <BinaryWhite /> : <BinaryBlue />}
            <Text ml="4px" max_width="20rem" lh="16px" color={color} size="var(--text-size-xs)">
                <Localize
                    translate_text="No sign up needed. Log in with your <0>Binary.com</0> credentials."
                    components={[
                        <BinaryLink
                            key={0}
                            external
                            to={binary_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            color={color}
                            size="var(--text-size-xs)"
                            weight="bold"
                        />,
                    ]}
                />
            </Text>
        </Flex>
    )
}

CtaBinary.propTypes = {
    is_white: PropTypes.bool,
}

export default CtaBinary
