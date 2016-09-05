module spine.webgl {
	export class LoadingScreen {
		private static loaded = 0; 
		private static spinnerImg: HTMLImageElement = null;
		private static logoImg: HTMLImageElement = null;

		private renderer: SceneRenderer;
		private logo: GLTexture = null;
		private spinner: GLTexture = null;
		private angle = 0;
		private timeKeeper = new spine.TimeKeeper();
		backgroundColor = new spine.Color(0, 0, 0, 1);

		public static useDark = true;

		private static SPINNER_DATA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAfCAYAAADwbH0HAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgtJREFUeNrsVz1LA0EQvbt8IIFoESshEBRCSsXOwhhsLBTS+jf8BSns/QtWYqeohY14lVoIpg4EAwGxMEZMkHiF5xsYdVx2z9zlksoHj8l+3Lyb2dndi2VFgO/7e/4PumDNGjdIxNejNm7hrkH4Powf2+B8DqYM9kHXtu2eGPONzoBRItoCbwUvwTUxfmeI+ChyxBzpiWZeD8FUeE4VRidSwRxX+ErB5Lj5irE3OdlRHi4bXjALR8uczmMSAcm6bJekKGOG/ROnVYdJpd0PyE5PrKXLokH4kMlUB9WIXSkg0IBYI2S5vIAD5vMwxVUET0VxHVCfNSnwC0xOcFKwOToq+3Uuf1rLa7X8YxeGaB52B8yI/jaEd2NctgTMAm1L0AObVNWbiighj8mLMQZYYFFCml7C0Yh+i8conFDaaRI2rWU7RmFPbZPwmUac1rgeo3CbDxSLtZqyqle+BiB6Yf1jHAeIsuemYDbAEh/wdc2VN8zezYid8QQfnb+E6aJX97AbRpxFV8GU6L6S4o7mOd3BUQoZcF4RJcwH3ccmDAI+CiMhqelr8RGn9v26Mnn7pfHb4zQ2lH1bDDqQTMVVFem9gdNzMU5n7rbmhfcxzxPzciK9dCA9BkaMCZTWw4AsZQ39s+CD8EOF1DE5cSIsz3vI/niEOZKG5mOwM/JfmCH3aoG/WFphRQmfAgwALNYr+OATlbkAAAAASUVORK5CYII=";
		private static SPINNER_DARK_DATA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAz9JREFUeNrMWL1rFEEU3xENR/RUOFEjCXjNXREkKZMUkjGFFolYHcYqSLRVsLMQ/QvEOhBSmUKEaJooxL0qH6BwEoRwRXJizAUhEBOJH834e7tzMO7N7O7tR8yDN8y9mTf7uzdv3rw3TAhhHUY6Yh1SOpr4ipwNor0B7gWXLVs8jrIMS3QrOTuNtgY+pUg/AlxvOlvJWQm8DP4KfuIz874HFFGPBJwwMM660T4Fd0rJOGSThtmDBvnFNCyms9BVgOvXyHWW+Y6trKQB7JNB/kAj69HIZtIKF4sGeT+s1hVCf8rHTXLg9mjAbDGH9o1hdDxA+zP0y1q/5WzY+XOWdQX9fNQAS6dtQyPv9vx+pdFTAbWDL6OXb1qHs/OtB1hb7ELxNnovwVllZNczc0wyHYIK9GYUUCfRDvh8k8a3ogVYN3RMytDxAvzIAR2sdwztUIAhKBB/aQbGGVliVLHILCZWE7oR8pptV2kL33pv2sq7EliDRrFg3bnvLGsaipsxoP30kVdVS/1rMc4K6D8PDLS2mI1hNTqBuSBAXmAX0H8dYvnrsSxHcYtA2WI/XNpDH+Ms/STLFttRIv8tcN1nbj2mn8XMx1x/o60tSElWAqZTuhfzdLahLSon/zeYrLjntSY70JyfsxG0HYbRHzLj3fwfOX+Hz9gJ8LC0augM9jj4UgLA/oSYcyb4ruRsyAkRjUuXs3WY+l4MYAvyvmyLVoy4gOgWOKvRoVtgOoafZeXBKsrtU6mGtd/qLcbZHbQjAb4QJ5bRyf7gsBtwi8oJXdGnPZz1BYDa1+RcJstkZHFCa+44KbYtapqAuxCm4M0HgJrAYt88Ma8oxyqeWNQnuVGkjGH+VBO4kDn/smHeOvghFp1XQHXJgoRS5JKhOPHSTWnJFoHZYg3tM2mBBr2ToNY8uiXP75z0mQb90nwv44CL9HZBVuGMnPAc+is+WUJBM5KTVwzRKviatvglX7bFUuvlG/mRCZRLpreIDWWNHcfvIlbmUa+kAcMf8uZZZYN+Ji1gnRpZVQOUrKbbsqWDfLjb9imYy8qBmINsNa2Hu0VZRatFxbxPtC/7bGvCD3fufdorLVWJ8qKTDrCU6a8AAwBaAgz07w8GWAAAAABJRU5ErkJggg==";	

		private static SPINE_LOGO_DATA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAAgCAYAAAGN5d0LAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAABBFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3RhbmNlSUQ+eG1wLmlpZDo2NjYxMjA0QzhFMzExMUUyODUyOERFQ0Y4QTY3MkFFMjwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDo2NjYxMjA0RDhFMzExMUUyODUyOERFQ0Y4QTY3MkFFMjwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDo2NjYxMjA0RjhFMzExMUUyODUyOERFQ0Y4QTY3MkFFMjwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDo2NjYxMjA0RThFMzExMUUyODUyOERFQ0Y4QTY3MkFFMjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KmdHpwgAAEg1JREFUaAXlmnuQ3UWVx/t37517ZzKTzORFEgkkLnERWVdjsssqMQlgDWQtLVeKoLgPah+lIuWC7NYuWkWN4gsVhfJdtdZClSVKxCqxSAU0TIIir0TBkICGmJoQ8piZzNzHPO/r5+fb99e/+f3u3DsP4A8tu6pvd58+5/Tp031On+7fNaZJ8reaW5t01cBDQ7l/dAjZbPZIuVzxXZtKwvd9b2Rk5M2CkxLqy2ZzQxYnl8t91CFns/nvqO5fYp6xJYQQpEZGRi1D1ZUNP54jChCT0XajOjR25Gl9/qXmLf47TOe0jnoAMh+LwvyLzUK1i8VSON9cLm/rmnSqUChspj/s9K8ySdNiviGiSqVi7r333qTEymQymlJKcJsYqc/VVfpbzIPRdqwOpYcWbxwezt0pbupkGa5UCewnKl1iLb9G9m3eYnY7OPQ9qk/DhzfCfBN+/+N4m3y+4A8PD69xxFFpQfw3EDOuD8X6KHhKBTAcH58AxU9p+lpaktsTZXg9rzwxMeknhoezfZWK/x7PS/zGMUQZXqlU9tl0H0kmU/8HvBz2ldGub46xfy50MJi7qnQc1js7F6F7syuR8D4/MTFRDTuiFSQZiLajdb+Hnb3F7EWVn4vCX9W6HWSreZZB/urlMLZ61aIePXq01TFgsS9na17KWn0LldQsZ48R7nnkAwymDW1pRQNOGpo7s9mRbrVdgn5xuGFkBGJ28ODB9BRCrhKph+tkZxUZwOFUKlW7QAx2wsEGBkZfwyD/DO/E5GTRN/IiWNkhh6CyUBixhCBZZ0Fp/YPfjfDagZRRfDbPNTW6woVnzpw5R3XWusTAh7T74H8ylUolLRMARXZLm+d54WxEkE6nDbAa44pZyT78lbfXnK0+l5LJ+MCCe54Z7OzsfIOEVTvBAH1aEwZpcYNUq9UisMeQZHJsbHSDEG3abfqNZx6ys+qZWiO8iRWkWCyatrY2W2eQVaOjYzKVS+HzlGOhBQ3dp1Nd2BmpsL1vJ18SATWtwnNmF1wu1xa3EQd/s7mAXfdTxA53XSO8pjDpsqenx3rd6OwcQW9vr04OK2FQb4orGoR5Gi8ySVkk+9StG6P+c4QMtef4w7slqNsTi3ZC47j+RqVwyJLLljEcgL6Whr3xgPaH2jEEGtjfEVzkHvqzMh3Kk/KbSqdOnTqLYpo2mUCv88nyy9ZCLjTp6KSg0yS8mqXlLqcu3hzhoyon2Us/UX9UHrU5vr89NjbO2ZDtQ7bdgZ+vyc1mfj+E/tjYmLUQCDTrGBMxhPiYCKPMpUno75ffj8JVjwpu29vMIn+byUyDB2OJN8L9B2PbQ4oySfsyKfvkycLyqEyM+fPo4W75Izf+6A7JEgqPhV2fybR8tVQqCedYV1fnGlVcQmt9yWTy3IULO0IaBkoND+evSqdT32tvX9AG7mToTmhYn1U0smvRlE3KpL3d8a0nYUWjSRWLk9csWrRoB+2yTtZt27a9noPz2cnJiXOXLFnyEnB7yGkRSGXc0A3VKgfmVPISiYi7koDK6pfnRUvbXVswJnWMXJUzBW73veDais28ijy/cKKJlYrBxEv9mpR2jRtTk+LYulDbUE4buKVTP4r8mGTp7+9fSTsd2PiU/WEP7WytA2IqGwH5iI4qMY0KA7xPPlMwBu+vTTw3Ojw8uh7GMVxHp7AOB/H32NYIWQ6jRP4gORQAWjsp+EuR3Y4XJdtpeI2EP3HixDKH53irZLvdrf5isSy5ZV97UcRZUZwZ6xD1NVuRGQnp9OUcNMENpqXepmajfTn9sa3QjIG0JBvbt++plkYaa0YnuN2CK81aM4RNLTJFw/XGBuYzEb3CPrv0r5BHQ3K22ON0DGK238E1PEY96+0xcp/Yd8SYG1K/MqAzPrlxe42hDPd7lDVw52XCw7EZrqXzzEWUlzOhHeSTuIdx/3Li/gYTCsa240YP9uj4jeoan+xkD+1aQA+DXO15yU/jWXXB+x55Rz0TDrtPAOshY5T5L+E6z4PfXbTvI09PErEUOAS5F+UwIp5CD8bv5rjoAnrP+vUbN3PhurFa9ftoXy+hnSt3VKIh+fl8nrDWey/M8xxFn6P/OeF4Q0PZm9Ppls9WKuVDIJ9IpzPv4Fz4ZFdX12cgVOTuDQwMtC9btrwwMlLYvHDhwkdwGmP0ZaAvE3ucWby482wxc8nazIB5Latz2J5KmpBS1TzKFtxUa0z9wm8/reXkSkdHx1rCiUFi7GWcfQqj601EbcTyOddKHAXjP6O9LpFIrPX96oNEtlcEZ1LuATqE6bZjeM0Bpu3WLndeO5MKFwhXCZf6XQQqDwzkzwcnXH71RZ0B9tUhWLPEyj8DnxL5pMNh93Tpikzfjnre4BV0/AiXPiszZ9e1OpRZvWVGYQVIpwIEu69BDLWj+qlTfrsOQc6nbbS1QmFSuML58EPgsUmFCEGFia2uh7m2JuWuYg6mMjg3ByMwK5fOSIIAHdR2Qq5fPFD0nQkuMNe0tLSskHAw/98AIYYsmHYBuUA1Zhksu+DryZWA1hZM4oANYnXFu8xa1IscxLforIriuTo25KphiRnoVSpUoiYxODj4+snJScOwn2Zl7JWQRXmeyRzk4C0CPz9FrHXv6dOn729tbX2kvb39VghvZUVwAn5fVFDq3Fmnu2JueOEWcNIwIR63zC+xofOI/DLYlSROUu4yfwFUFjSHhL0ybLhpLAUOpQ3ZqPs/oG9AwztWbKpkpZL6QYoOaUOGb6+cCuczmdYjtOPcoEwkqhMUMbhWCtCzCqu2b99uVwtnoNVUODRGuZ08BNX13sPmSerzTKHMokNU//caEwU/3tm5UI9kdswI01p73759ihSSKlnKXzojDLhYm5KjcGESuMLPZLOFD4GPgWc3ij7C2FaZlLXRenh9WzZVKk29i7p+eFfI2vKxxFjyA/aNlGqqt3cqGLeIQmC73T40NPR2mH8GZB7Psii+FtDSbSelgBeHUAgi+JvZz3eBW5UDiY1Y12Bi/05+iKzXwpg9OlT4/Lr+fqQ+4PKIOYenMrjDfUBjI/cgsl4tByYHIdmoL4Ew/3EQJgIvWKazJ8rETUorBYO3gP8F1Wvt3M4obqO6nASTmSAX69+EHD7j7ySPu7YrGetF4L91bVciU0LXEibwknZVcGM4DX7N0YEQ2yIN2uH2YzUvpj/mjdxAjUqWMOFvMovxenqI/KJwgMVsshHdXGDIMX27B3ORo4htifq2G6DmN+z8Q3xgjZ9bAyKkr/q/MFnTw9PTEzVXDmzG7erGm61k7Eo9jpN92nlUj6j2ihXGq738VVJ79uyZl6btJPaYR824uYfVeqER/1cbFtt6jZgze2l2hCt159KlS/ONcOYA28imSzU+dudAPU+UeWl9nrxfVXTFkt4OU2G1d3Kcb+MGUHvt0AxkBLVnW3nKcTa4nE4WRf6Gvk95j5ijsm9QZzQXaP5okzMpBeLTnEm91OA4/Pqupm0dd9DNuCHckdiUiTp2hEomCKddZWnksVSf8hidLNIKIGtZpDeSr+X20+u/1bRpkebreGeTXfN6OTqBZlarByemN6d4ncM36QgGYVrSgzB9v+OUsjcpEBwdOrHhmF0I4AvAGxQD+D2vvu7u7jXEHg8qonSJeNzezNQG/ynhBHyab5Ye1K6UMP/AYvTjdISrJdJyKSuwlUvTOaiyEoRoX/Ee4yGBgA0GtX6LVPtBhBpfmppjIJPf3+93bNq0aTGy71Qs5ZIuN05+5njf8ePH7alNf0wnkSFslf5wHG58Ci77gw/jjnVY0lcljLgDQstTvBP46dV0jPO2exsdaZhcjw8PE4vTyR3+avqSPGJstqMGDIJ6WJw+bZU5SrxFYGSWEijmuFsfAeEiArub4f06Ypvlo6Mjb6S8B0FFe4FwmPR3GVTXhYaL5fUEFrXUnPJ6zQrvZ4zlmS3Qf56sUP0Q+XiQf015G9bWxnXhTlYnEVwbADdPjD0eXOoK6XT+xVWrVul77SYudQS6uXV8PFzF5XML89hf1iXMN1esXr16bHi48F5kZ/s1ll3BKv0EzvmbwCEZLcLSQiH/X9z5OpyyWfQFjPMh+kpckFSWaX9SvPV8fIOiY+0SgtVv0YkAvi5hdgeoJEdNNdwZwlWK4Laz6McUteuKwkIdHR0dfU2AkwbPfk3Rk7Zg3GDPZswR8Lhn+nYiguv6o7JZ8nuCncYC2BdfrIXFiMmldvSNpCmvyE5HlmdqUX5elj7AZrIe5PDhwxknO2WreBH030Ld11zB/a2TGVBcjkB38L5ZcwyeJ3aJh/QAvnVxogvqdqOik6dlyVobni0+wP8Z8ksZaEiK1aAgEOlnr4QoNGX3tijmjZIGEVxvM/Dqk5vTIxDW+neCSwCV0eQmpluO3IlooI3e8WMTFq1TPG7sarK+1f+K/DCfaX/MJeAB6vuov0SpbxEv6MuqpQsWNjq+qzvZ1cbdPCPl1G5gWV3W7dVNpUtuLjx0vQl53ULl+bS3Wjj0h3pzdYxhCbj9wU2tQvtvAtw2bQKXwU/rW436WINPSC9aKNbkR6ldu3ZleVVYglm+Gwv7Om5oNR+8f8jOMnIDKJwIqno3zD8O/bAExRQrYjZTAof3kpZpC+RoNmzYwKZn23v+If1vB6HU1LfCdmj1Dxa9twgWJkV9tuGbj2FT+vdGkVOHhyxqlputqVXiBDuP1ruoP2f2WAucR8TnMXfPyr5161ZYTKUdO2rP1jyzlpFZPK2X4Dk1LmyNxMKYy9pEIrlcnzKpJ9Dxk5qf0rp162qYwe8KLkOuT/pvaUnxKuRNJNzTz9NP79/JG/M5AL3W1ozHN8qL8/ncj6i3oc5/hfkQu+LxyCI1EswO5waiEe6umDQ09u/fb+nht4pJmGSSD5p4Py1SPa5rO5fHAlzJwhznDpNmBGYSZv1pK8EiZQgvbuEs+4Jo5nI+uTFcyd9B5pzqN5QjdItKf0H/EgkeRwkUsq8FNmtCJxYH3V9jFYmCknv37o3tOD4APMnCXalFY+ADsrAFCxZchKv8FwkiGidQtAQuX2v/G5NM+huDvlioKZyNGzfqowO+39zAAW14RAXVu0/4cotIWNtyAQMVYUCx3JxE+ed4D2F0D7Nso/x3T/lhFoUgw34kP8vcZu9eLgiJ8Jm9Om3o2UkaYMgINFcUfRjpH9W//Do6FqL95HVCp8+e1Q1I1Rc7s/SXg7tQ/u3XXXfdgigBilLIK195GcUG/sqmv1hU+BvQEwFebGEFw2qtu9LOwRVU+Bvdl3Xu4Tb/M6p41eF7KW41C9k5vHIrqOnlS9CnJKAWMRijYRG6wKDXe8Lkbdbcu007T/d/awbM+80Z8yahoPam1t9wgPmiN2bioHZsVHIV+hseHx8zmUz6v/FOTxJMLXVI9WWgo3eilxulE90dvk8lvNco6lEg4O4OOsyUwNtHYf91ShlzabStMC6YEC34mHhhOwfhbvptVKmoRweksoIXtWtRU+EqCQpaQyutn4TFDR6yCRreZ/8UpKdSZf1JaCuXW17v7R+HLuE8E+8mD99OdpXI/LybLwr6J0sXj3hDGbm2/LVkD+Za1J8iAvyYbgRTgr+Fs0E/LP1q7m4slQqmxEvwaEKmp0Qb7jQaHlHa+XygWkNdsT13iuRLXV3tz1EvusGoT7Mk0ZL4t5Xf3tqaP8TD4LkKEMrl0pbFixc/IlpFl/jp9VT1QTcHze/o61Mf9TkFKMJ1SVaC8DqSPd5Hf8HZ9DZ77dWMlOmgfT/hxvvshTfAd/SNSuRoRZErCRTGcP39jXCiMH3iZN5LmOtg8GboRo6ixerRuaLvRXyP+stqNbGSz0gZePHmb/rTae8o39XCL4zQiG8tqSEmZPu/pKCMnS0Ot74UrWDOohSGymKGhvIXCx7w5T97Md4Nd57w55NYj6Z81DdTf/04mgdZUVxTnlEa4emZSf+NjMLnWg/GaqRzG0lG+YQXWVkEHZVo5/zrpyFpk/ES3lZNSt9FgwR/WeI0a3T9L7dkh9g3PMpwLMdLfa4+lzLQwTQ+zWiDOTXrnhU+H/pwoWblOgcE7gATuLiDPK/oLOtHEGe+c578HIaJoejsUfhNeS1B+f/j6mo2phF14pXMC/S/TkSArLtU/c86YUnWBTol1Lcd/NUudVcSTwKJbl4mdrNoBygfpbzJjaVFcvU/xfIPPiq1IInXBLAAAAAASUVORK5CYII="
		private static SPINE_LOGO_DARK_DATA = "data:image/png;base64,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";

		constructor (renderer: SceneRenderer) {
			this.renderer = renderer;

			if (LoadingScreen.logoImg === null) {
				// thank you Apple Inc.
				var isSafari = navigator.userAgent.indexOf("Safari") > -1;
				LoadingScreen.logoImg = document.createElement("img");						
				LoadingScreen.logoImg.src = LoadingScreen.useDark ? LoadingScreen.SPINE_LOGO_DARK_DATA : LoadingScreen.SPINE_LOGO_DATA;
				if (!isSafari) LoadingScreen.logoImg.crossOrigin = "anonymous";
				LoadingScreen.logoImg.onload = (ev) => {
					LoadingScreen.loaded++;
				}									

				LoadingScreen.spinnerImg = new Image();
				LoadingScreen.spinnerImg.src = LoadingScreen.useDark ? LoadingScreen.SPINNER_DARK_DATA : LoadingScreen.SPINNER_DATA;
				if (!isSafari) LoadingScreen.spinnerImg.crossOrigin = "anonymous";	
				LoadingScreen.spinnerImg.onload = (ev) => {
					LoadingScreen.loaded++;
				}
			}
		}

		draw () {			
			this.timeKeeper.update();
			this.angle -= this.timeKeeper.delta * 360 * (0.5 + 2 * Math.abs(Math.sin(this.timeKeeper.totalTime)));

			var renderer = this.renderer;
			var canvas = renderer.canvas;
			var gl = renderer.gl;

			gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
			gl.clear(gl.COLOR_BUFFER_BIT);

			if (LoadingScreen.loaded != 2) return;
			if (this.logo === null) {
				this.logo = new GLTexture(renderer.gl, LoadingScreen.logoImg);
				this.spinner = new GLTexture(renderer.gl, LoadingScreen.spinnerImg);				
			}
			this.logo.update(false);
			this.spinner.update(false);

			renderer.camera.position.set(canvas.width / 2, canvas.height / 2, 0);
			renderer.camera.viewportWidth = canvas.width;
			renderer.camera.viewportHeight = canvas.height;
			renderer.resize(ResizeMode.Stretch);

			var logoWidth = this.logo.getImage().width;
			var logoHeight = this.logo.getImage().height;
			var spinnerWidth = this.spinner.getImage().width;
			var spinnerHeight = this.spinner.getImage().height;
			var margin = 25;
			var height = logoHeight + margin + spinnerHeight;			

			renderer.begin();
			renderer.drawTexture(this.logo, canvas.width / 2 - logoWidth / 2, canvas.height / 2 + height / 2 - logoHeight, logoWidth, logoHeight);			
			renderer.drawTextureRotated(this.spinner, canvas.width / 2 - spinnerWidth / 2, canvas.height / 2 - height / 2, spinnerWidth, spinnerHeight, spinnerWidth / 2, spinnerHeight / 2, this.angle);
			renderer.end();
		}
	}
}