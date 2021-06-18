class Constants  {

    public static riverWidth = 250
    public static flowRate = 2
    public static verticalOffset = 400
    public static centerPointYGap = 5
    public static sandBankWidth = 80

    public static canoeSize = 100
    public static canoeInertia = 0.6
    public static leftPaddleDragForce = -1
    public static rightPaddleDragForce = 1
    public static leftPaddleForce = -0.5
    public static rightPaddleForce = 0.5
    public static forwardPaddleForce = 2
    public static backwardPaddleForce = -2

    public static GRASS_GAP = 100

    public static rockWidthAndHeight = 20

    public static proportionOfCorrectNumbers = 0.25
    public static randomRange = 10
    public static numberCircleSize = 70

    public static pagePadding = 25

    public static scoreBoardLabelSize = 20
    public static scoreBoardLabelMargin = 10
    public static scoreBoardNumberSize = 50
    public static scoreBoardNumberMargin = 20
    public static scoreBoardHeight = Constants.scoreBoardLabelSize + Constants.scoreBoardLabelMargin * 2 +
                                     Constants.scoreBoardNumberMargin * 2 + Constants.scoreBoardNumberSize
    public static scoreBoardWidth = 100

    public static equationBoardWidth = 400
    public static equationBoardTextSize = 30
    public static equationBoardPadding = 10
    public static equationBoardHeight = Constants.equationBoardPadding * 2 + Constants.equationBoardTextSize

    public static clockWidth = 120
    public static clockTextSize = 40
    public static clockPadding = 10
    public static clockHeight = Constants.clockPadding * 2 + Constants.clockTextSize

    public static maxMinutes = 0.5
    public static maxMillis = Constants.maxMinutes * 60 * 1000

    public static popupWidth = 400
    public static popupMainTextSize = 40
    public static popupSecondaryTextSize = 20
    public static popupMainTextPadding = 15
    public static popupSecondaryTextPadding = 10
    public static popupHeight = Constants.popupMainTextSize + Constants.popupMainTextPadding * 2 +
                                Constants.popupSecondaryTextPadding * 2 + Constants.popupSecondaryTextSize * 4

}

export { Constants }