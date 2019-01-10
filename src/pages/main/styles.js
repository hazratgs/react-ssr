import styled from 'styled-components'

export const ScreenWrapper = styled.div`
  position: relative;
`

export const PhoneWrapper = styled.div`
  padding: 0 3rem;
  margin: auto;
  max-width: 86rem;
  min-height: 100vh;
  position: -webkit-sticky;
  position: sticky;
  top: 100px;
  width: 100vw;
  height: 1px;
  min-height: 0;
  padding-right: 0;
  z-index: 10;
  pointer-events: none;

  .iphone-wrapper__content {
    display: flex;
    height: calc(100vh - 100px);
    min-height: calc(100vh - 100px);
    margin: auto;
    max-width: 1320px;

    .iphone-wrapper__item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`
