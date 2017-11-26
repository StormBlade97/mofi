// component in charge of giving shadow
// inspired from material-ui PAPER component

import React from 'react';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';
import { grey } from 'material-ui/colors';

export const getShadow = (elevation, shadowColor = grey[500]) => {
    const frontShadow = tinycolor(shadowColor)
        .setAlpha(0.2)
        .toRgbString();
    const auxilaryShadow = tinycolor(shadowColor)
        .setAlpha(0.14)
        .toRgbString();
    const ambientShadow = tinycolor(shadowColor)
        .setAlpha(0.12)
        .toRgbString();

    const shadows = [
        `0px 1px 3px 0px ${frontShadow},0px 1px 1px 0px ${auxilaryShadow},0px 2px 1px -1px ${ambientShadow}`,
        `0px 1px 5px 0px ${frontShadow},0px 2px 2px 0px ${auxilaryShadow},0px 3px 1px -2px ${ambientShadow}`,
        `0px 1px 8px 0px ${frontShadow},0px 3px 4px 0px ${auxilaryShadow},0px 3px 3px -2px ${ambientShadow}`,
        `0px 2px 4px -1px ${frontShadow},0px 4px 5px 0px ${auxilaryShadow},0px 1px 10px 0px ${ambientShadow}`,
        `0px 3px 5px -1px ${frontShadow},0px 5px 8px 0px ${auxilaryShadow},0px 1px 14px 0px ${ambientShadow}`,
        `0px 3px 5px -1px ${frontShadow},0px 6px 10px 0px ${auxilaryShadow},0px 1px 18px 0px ${ambientShadow}`,
        `0px 4px 5px -2px ${frontShadow},0px 7px 10px 1px ${auxilaryShadow},0px 2px 16px 1px ${ambientShadow}`,
        `0px 5px 5px -3px ${frontShadow},0px 8px 10px 1px ${auxilaryShadow},0px 3px 14px 2px ${ambientShadow}`,
        `0px 5px 6px -3px ${frontShadow},0px 9px 12px 1px ${auxilaryShadow},0px 3px 16px 2px ${ambientShadow}`,
        `0px 6px 6px -3px ${frontShadow},0px 10px 14px 1px ${auxilaryShadow},0px 4px 18px 3px ${ambientShadow}`,
        `0px 6px 7px -4px ${frontShadow},0px 11px 15px 1px ${auxilaryShadow},0px 4px 20px 3px ${ambientShadow}`,
        `0px 7px 8px -4px ${frontShadow},0px 12px 17px 2px ${auxilaryShadow},0px 5px 22px 4px ${ambientShadow}`,
        `0px 7px 8px -4px ${frontShadow},0px 13px 19px 2px ${auxilaryShadow},0px 5px 24px 4px ${ambientShadow}`,
        `0px 7px 9px -4px ${frontShadow},0px 14px 21px 2px ${auxilaryShadow},0px 5px 26px 4px ${ambientShadow}`,
        `0px 8px 9px -5px ${frontShadow},0px 15px 22px 2px ${auxilaryShadow},0px 6px 28px 5px ${ambientShadow}`,
        `0px 8px 10px -5px ${frontShadow},0px 16px 24px 2px ${auxilaryShadow},0px 6px 30px 5px ${ambientShadow}`,
        `0px 8px 11px -5px ${frontShadow},0px 17px 26px 2px ${auxilaryShadow},0px 6px 32px 5px ${ambientShadow}`,
        `0px 9px 11px -5px ${frontShadow},0px 18px 28px 2px ${auxilaryShadow},0px 7px 34px 6px ${ambientShadow}`,
        `0px 9px 12px -6px ${frontShadow},0px 19px 29px 2px ${auxilaryShadow},0px 7px 36px 6px ${ambientShadow}`,
        `0px 10px 13px -6px ${frontShadow},0px 20px 31px 3px ${auxilaryShadow},0px 8px 38px 7px ${ambientShadow}`,
        `0px 10px 13px -6px ${frontShadow},0px 21px 33px 3px ${auxilaryShadow},0px 8px 40px 7px ${ambientShadow}`,
        `0px 10px 14px -6px ${frontShadow},0px 22px 35px 3px ${auxilaryShadow},0px 8px 42px 7px ${ambientShadow}`,
        `0px 11px 14px -7px ${frontShadow},0px 23px 36px 3px ${auxilaryShadow},0px 9px 44px 8px ${ambientShadow}`,
        `0px 11px 15px -7px ${frontShadow},0px 24px 38px 3px ${auxilaryShadow},0px 9px 46px 8px ${ambientShadow}`,
    ];
    return shadows[elevation < 0 || elevation > 23 ? 0 : elevation];
};

const Shadow = styled.div`
    box-shadow: ${({ elevation, theme, shadowColor, primary }) =>
        getShadow(elevation !== undefined ? elevation : 5, shadowColor || (primary && theme.accent))};
`;

export default Shadow;