import styled, { css } from "styled-components";
import theme, { px2rem } from "~/theme";

export const CaptionStyles = css`
    width: 100%;
    text-align: left;
    font-size: ${px2rem(theme.fontSize.aside)};
    font-style: italic;
    margin: ${px2rem(theme.gutter)} 0;
    color: #999;
`

export const Caption = styled.p`
    ${CaptionStyles}
`