import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import { isEuCountry } from 'common/country-base'
import { BinarySocketBase } from 'common/websocket/socket_base'

const Show = ({ children, to, device }) => {
    const [invisible, setInvisible] = useState(true)

    useEffect(() => {
        if (to) {
            const switchCaseEu = is_eu_country => {
                switch (to) {
                    case 'eu':
                        setInvisible(is_eu_country)
                        break
                    case 'non-eu':
                        setInvisible(!is_eu_country)
                        break
                    default:
                        break
                }
            }

            const clients_country = Cookies.get('clients_country')
            let is_eu_country = false

            if (clients_country) {
                is_eu_country = isEuCountry(clients_country)
                switchCaseEu(is_eu_country)
            } else {
                BinarySocketBase.wait('website_status').then(response => {
                    is_eu_country = isEuCountry(
                        response.website_status.clients_country,
                    )
                    switchCaseEu(is_eu_country)

                    /* country_code cookies will be valid for 1 month */
                    Cookies.set(
                        'clients_country',
                        response.website_status.clients_country,
                        { expires: 30 },
                    )
                })
            }
        }
        if (device) {
            switch (device) {
                case 'laptop':
                    //TODO: add breakpoints for laptop > window.innerwidth here, and update setInvisible memoized state
                    break
                case 'mobile':
                    //TODO: add breakpoints for mobile > window.innerwidth here, and update setInvisible memoized state
                    break
                default:
                    break
            }
        }
    })
    return !invisible ? <>{children}</> : null
}

Show.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    device: PropTypes.oneOf(['mobile', 'laptop']),
    to: PropTypes.oneOf(['eu', 'non-eu']),
}
export default Show
