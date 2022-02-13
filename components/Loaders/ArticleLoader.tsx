import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { ViewProps } from "react-native"

const ArticleLoader = (props: ViewProps) => (
  <ContentLoader 
    speed={2}
    width={350}
    height={700}
    viewBox="0 0 350 700"
    backgroundColor="#292929"
    foregroundColor="#646464"
    {...props}
  >
    <Rect x="0" y="20" rx="0" ry="0" width="400" height="100" /> 
    <Rect x="0" y="140" rx="0" ry="0" width="400" height="100" />
    <Rect x="0" y="260" rx="0" ry="0" width="400" height="100" />
    <Rect x="0" y="380" rx="0" ry="0" width="400" height="100" />
    <Rect x="0" y="500" rx="0" ry="0" width="400" height="100" />
  </ContentLoader>
)

export default ArticleLoader