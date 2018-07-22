import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

class RamMarketChartView extends Component {
  render() {
    return (
      <div className="col-md-12">
        <div className="card sales-menu-card">
          <div className="card-header ">
            <div className="card-header-left ">
              <h5>RAM market</h5>
            </div>
            <div className="card-header-right">
              <i className="icofont icofont-spinner-alt-5 " />
            </div>
          </div>
          <div className="card-block">
            <div className="row valign-wrapper">
              <div className="col-sm-9">
                <div
                  id="area-custom"
                  style={{ height: '200px', overflow: 'hidden', textAlign: 'left' }}
                >
                  <div className="amcharts-main-div" style={{ position: 'relative' }}>
                    <div
                      className="amcharts-chart-div"
                      style={{
                        overflow: 'hidden',
                        position: 'relative',
                        textAlign: 'left',
                        width: '1006px',
                        height: '200px',
                        padding: '0px',
                        touchAction: 'auto',
                        cursor: 'default'
                      }}
                    >
                      <svg
                        version="1.1"
                        style={{
                          position: 'absolute',
                          width: '1006px',
                          height: '200px',
                          top: '-0.203125px',
                          left: '-0.203125px'
                        }}
                      >
                        <g>
                          <path
                            cs="100,100"
                            d="M0.5,0.5 L1005.5,0.5 L1005.5,199.5 L0.5,199.5 Z"
                            fill="#FFFFFF"
                            stroke="#000000"
                            fillOpacity="0"
                            strokeWidth="1"
                            strokeOpacity="0"
                          />
                          <path
                            cs="100,100"
                            d="M0.5,0.5 L965.5,0.5 L965.5,148.5 L0.5,148.5 L0.5,0.5 Z"
                            fill="#FFFFFF"
                            stroke="#000000"
                            fillOpacity="0"
                            strokeWidth="1"
                            strokeOpacity="0"
                            transform="translate(40,20)"
                          />
                        </g>
                        <g>
                          <g transform="translate(40,20)" />
                          <g transform="translate(40,20)" visibility="visible" />
                        </g>
                        <g transform="translate(40,20)" clipPath="url(#AmChartsEl-25)">
                          <g visibility="hidden" />
                        </g>
                        <g />
                        <g />
                        <g />
                        <g>
                          <g transform="translate(40,20)">
                            <g />
                            <g clipPath="url(#AmChartsEl-27)">
                              <path
                                cs="100,100"
                                d="M9,116 C14,116,19,121,28,121 C37,121,37,112,46,111 C55,110,56,109,65,109 C75,108,75,103,84,104 C93,104,93,116,102,116 C111,115,112,95,121,94 C130,93,130,91,139,91 C148,92,149,98,158,99 C167,99,167,106,176,106 C185,107,186,109,195,109 C204,108,204,104,213,104 C222,103,223,97,232,96 C242,95,242,84,251,84 C260,83,260,89,269,89 C278,88,279,77,288,76 C297,75,297,68,306,69 C315,70,316,103,325,104 C334,105,334,89,343,89 C352,88,353,93,362,94 C371,94,371,103,380,104 C389,104,390,101,399,101 C409,102,409,113,418,113 C427,114,427,111,436,111 C445,111,446,118,455,118 C464,119,464,128,473,128 C482,129,483,126,492,126 C501,126,501,128,510,128 C519,129,520,130,529,131 C538,131,538,136,547,136 C556,135,557,122,566,121 C576,120,576,117,585,116 C594,115,594,104,603,104 C612,103,613,100,622,99 C631,97,631,78,640,76 C649,75,650,68,659,67 C668,65,668,45,677,44 C686,44,687,60,696,62 C705,63,705,73,714,72 C723,70,724,35,733,32 C743,29,743,20,752,20 C761,20,761,33,770,35 C779,36,780,46,789,47 C798,47,798,42,807,42 C816,42,817,49,826,49 C835,50,835,51,844,52 C853,53,854,63,863,64 C872,65,872,76,881,76 C890,76,891,65,900,64 C910,63,910,58,919,57 C928,56,928,46,937,44 C946,43,951,28,956,27 M0,0 L0,0"
                                fill="none"
                                fillOpacity="0"
                                strokeWidth="2"
                                strokeOpacity="0.9"
                                stroke="#4680ff"
                              />
                              <path
                                cs="100,100"
                                d="M9,116 C14,116,19,121,28,121 C37,121,37,112,46,111 C55,110,56,109,65,109 C75,108,75,103,84,104 C93,104,93,116,102,116 C111,115,112,95,121,94 C130,93,130,91,139,91 C148,92,149,98,158,99 C167,99,167,106,176,106 C185,107,186,109,195,109 C204,108,204,104,213,104 C222,103,223,97,232,96 C242,95,242,84,251,84 C260,83,260,89,269,89 C278,88,279,77,288,76 C297,75,297,68,306,69 C315,70,316,103,325,104 C334,105,334,89,343,89 C352,88,353,93,362,94 C371,94,371,103,380,104 C389,104,390,101,399,101 C409,102,409,113,418,113 C427,114,427,111,436,111 C445,111,446,118,455,118 C464,119,464,128,473,128 C482,129,483,126,492,126 C501,126,501,128,510,128 C519,129,520,130,529,131 C538,131,538,136,547,136 C556,135,557,122,566,121 C576,120,576,117,585,116 C594,115,594,104,603,104 C612,103,613,100,622,99 C631,97,631,78,640,76 C649,75,650,68,659,67 C668,65,668,45,677,44 C686,44,687,60,696,62 C705,63,705,73,714,72 C723,70,724,35,733,32 C743,29,743,20,752,20 C761,20,761,33,770,35 C779,36,780,46,789,47 C798,47,798,42,807,42 C816,42,817,49,826,49 C835,50,835,51,844,52 C853,53,854,63,863,64 C872,65,872,76,881,76 C890,76,891,65,900,64 C910,63,910,58,919,57 C928,56,928,46,937,44 C946,43,951,28,956,27  L956,148 L9,148 L9,115.93333333333334"
                                fill="#4680ff"
                                fillOpacity="0.2"
                                strokeWidth="0"
                                strokeOpacity="0"
                              />
                            </g>
                            <clipPath id="AmChartsEl-27">
                              <rect
                                x="0"
                                y="0"
                                width="965"
                                height="148"
                                rx="0"
                                ry="0"
                                strokeWidth="0"
                              />
                            </clipPath>
                            <g />
                          </g>
                        </g>
                        <g />
                        <g>
                          <path
                            cs="100,100"
                            d="M0.5,148.5 L965.5,148.5 L965.5,148.5"
                            fill="none"
                            strokeWidth="1"
                            strokeOpacity="0"
                            stroke="#000000"
                            transform="translate(40,20)"
                          />
                          <g>
                            <path
                              cs="100,100"
                              d="M0.5,0.5 L965.5,0.5"
                              fill="none"
                              strokeWidth="1"
                              strokeOpacity="0"
                              stroke="#000000"
                              transform="translate(40,168)"
                            />
                          </g>
                          <g>
                            <path
                              cs="100,100"
                              d="M0.5,0.5 L0.5,148.5"
                              fill="none"
                              strokeWidth="1"
                              strokeOpacity="0"
                              stroke="#000000"
                              transform="translate(40,20)"
                              visibility="visible"
                            />
                          </g>
                        </g>
                        <g>
                          <g
                            transform="translate(40,20)"
                            clipPath="url(#AmChartsEl-26)"
                            style={{ pointerEvents: 'none' }}
                          >
                            <path
                              cs="100,100"
                              d="M0.5,0.5 L0.5,0.5 L0.5,148.5"
                              fill="none"
                              strokeWidth="1"
                              strokeOpacity="0"
                              stroke="#000000"
                              visibility="hidden"
                              transform="translate(232,0)"
                            />
                            <path
                              cs="100,100"
                              d="M0.5,0.5 L965.5,0.5 L965.5,0.5"
                              fill="none"
                              strokeWidth="1"
                              strokeOpacity="0.5"
                              stroke="#000000"
                              visibility="hidden"
                              transform="translate(0,1)"
                            />
                          </g>
                          <clipPath id="AmChartsEl-26">
                            <rect
                              x="0"
                              y="0"
                              width="965"
                              height="148"
                              rx="0"
                              ry="0"
                              strokeWidth="0"
                            />
                          </clipPath>
                        </g>
                        <g />
                        <g>
                          <g transform="translate(40,20)" />
                        </g>
                        <g>
                          <g />
                        </g>
                        <g>
                          <g transform="translate(40,20)" visibility="visible">
                            <text
                              y="0"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="0px"
                              opacity="1"
                              textAnchor="middle"
                              transform="translate(9,160)"
                            >
                              <tspan y="0" x="0">
                                2012-07-27
                              </tspan>
                            </text>
                            <text
                              y="0"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="0px"
                              opacity="1"
                              textAnchor="middle"
                              transform="translate(84,160)"
                            >
                              <tspan y="0" x="0">
                                2012-07-31
                              </tspan>
                            </text>
                            <text
                              y="0"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="0px"
                              opacity="1"
                              textAnchor="middle"
                              transform="translate(158,160)"
                            >
                              <tspan y="0" x="0">
                                2012-08-04
                              </tspan>
                            </text>
                            <text
                              y="0"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="0px"
                              opacity="1"
                              textAnchor="middle"
                              transform="translate(232,160)"
                            >
                              <tspan y="0" x="0">
                                2012-08-08
                              </tspan>
                            </text>
                            <text
                              y="0"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="0px"
                              opacity="1"
                              textAnchor="middle"
                              transform="translate(306,160)"
                            >
                              <tspan y="0" x="0">
                                2012-08-12
                              </tspan>
                            </text>
                            <text
                              y="0"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="0px"
                              opacity="1"
                              textAnchor="middle"
                              transform="translate(380,160)"
                            >
                              <tspan y="0" x="0">
                                2012-08-16
                              </tspan>
                            </text>
                            <text
                              y="0"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="0px"
                              opacity="1"
                              textAnchor="middle"
                              transform="translate(455,160)"
                            >
                              <tspan y="0" x="0">
                                2012-08-20
                              </tspan>
                            </text>
                            <text
                              y="0"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="0px"
                              opacity="1"
                              textAnchor="middle"
                              transform="translate(529,160)"
                            >
                              <tspan y="0" x="0">
                                2012-08-24
                              </tspan>
                            </text>
                            <text
                              y="0"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="0px"
                              opacity="1"
                              textAnchor="middle"
                              transform="translate(603,160)"
                            >
                              <tspan y="0" x="0">
                                2012-08-28
                              </tspan>
                            </text>
                            <text
                              y="0"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="0px"
                              opacity="1"
                              textAnchor="middle"
                              transform="translate(677,160)"
                            >
                              <tspan y="0" x="0">
                                2012-09-01
                              </tspan>
                            </text>
                            <text
                              y="0"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="0px"
                              opacity="1"
                              textAnchor="middle"
                              transform="translate(752,160)"
                            >
                              <tspan y="0" x="0">
                                2012-09-05
                              </tspan>
                            </text>
                            <text
                              y="0"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="0px"
                              opacity="1"
                              textAnchor="middle"
                              transform="translate(826,160)"
                            >
                              <tspan y="0" x="0">
                                2012-09-09
                              </tspan>
                            </text>
                            <text
                              y="0"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="0px"
                              opacity="1"
                              textAnchor="middle"
                              transform="translate(900,160)"
                            >
                              <tspan y="0" x="0">
                                2012-09-13
                              </tspan>
                            </text>
                          </g>
                          <g transform="translate(40,20)" visibility="visible">
                            <text
                              y="6"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="11px"
                              opacity="1"
                              textAnchor="end"
                              transform="translate(-12,147)"
                            >
                              <tspan y="6" x="0">
                                0
                              </tspan>
                            </text>
                            <text
                              y="6"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="11px"
                              opacity="1"
                              textAnchor="end"
                              transform="translate(-12,98)"
                            >
                              <tspan y="6" x="0">
                                20
                              </tspan>
                            </text>
                            <text
                              y="6"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="11px"
                              opacity="1"
                              textAnchor="end"
                              transform="translate(-12,48)"
                            >
                              <tspan y="6" x="0">
                                40
                              </tspan>
                            </text>
                            <text
                              y="6"
                              fill="#000000"
                              fontFamily="Verdana"
                              fontSize="11px"
                              opacity="1"
                              textAnchor="end"
                              transform="translate(-12,-1)"
                            >
                              <tspan y="6" x="0">
                                60
                              </tspan>
                            </text>
                          </g>
                        </g>
                        <g />
                        <g transform="translate(40,20)" />
                        <g />
                        <g />
                        <clipPath id="AmChartsEl-25">
                          <rect
                            x="-1"
                            y="-1"
                            width="967"
                            height="150"
                            rx="0"
                            ry="0"
                            strokeWidth="0"
                          />
                        </clipPath>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <i className="icofont icofont-social-opencart text-c-blue f-40 sales-icon m-r-20" />
                <div className="sales-contain d-inline-block">
                  <h2 className="f-w-600">$27,672</h2>
                  <p className="f-w-600 text-muted f-16">Ram price</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RamMarketChartView
