const patternDict = [{
    pattern : '\\b(?<greetings>Hi|Hello|Hey)\\b',
    intent : 'Hello',
} ,{
    pattern :'\\b(bye|exit)\\b',
    intent : 'Exit',
},{
    pattern : '\\b(thank you|thanks)\\b',
    intent : 'Welcome',
},{
    pattern: '\\b(help|lost|questions)\\b',
    intent : 'See the FAQ',
},{
    pattern : "\\b(weather\\slike\\sin\\s)\\b(?<city>[a-zA-z]+\\s+[a-zA-z]*?\\s?)\\b(?<time>tomorrow|today|the\\sday\\safter\\stomorrow)\\s*\\??$",
    intent : "get weather"
},{
    pattern : "\\b(weather\\slike\\sin\\s)\\b(?<city>[a-z]+\\s?[a-z]*)\\s*\\??$",
    intent : "current weather"
},{
    pattern : "\\b(weather\\sin\\s)\\b(?<city>[a-zA-z]+\\s+[a-zA-z]*?\\s?)\\b(?<time>tomorrow|today|the\\sday\\safter\\stomorrow)\\s*\\??$",
    intent : "get weather"
},{
    pattern : "\\b(weather\\sin\\s)\\b(?<city>[a-z]+\\s?[a-z]*)\\s*\\??$",
    intent : "current weather"
},{
    pattern : "\\b(time\\sin\\s)\\b(?<city>[a-z]+\\s?[a-z]*)\\s*\\??$",
    intent : "time"
},{
    pattern : "\\b(is\\sit\\s)\\b(?<weather>cold|cloudy|rainy|sunny|clear|raining|hot|warm|very\\scold\\s)\\b(\\sin\\s)\\b(?<city>[a-zA-z]+\\s+[a-zA-z]*?\\s?)\\b(?<time>tomorrow|today|the\\sday\\safter\\stomorrow)\\s*\\??$",
    intent : "weather assertion"
},{
    pattern : "\\b(is\\sit\\s)\\b(?<weather>cold|cloudy|rainy|sunny|clear|raining|hot|warm|very\\scold\\s)\\b(\\sin\\s)\\b(?<city>[a-zA-z]+\\s?[a-zA-z]*?\\s?)s*\\??$",
    intent : "weather assertion"
},{
    pattern : "\\b(will\\sit\\sbe\\s)\\b(?<weather>cold|cloudy|rainy|sunny|clear|raining|hot|warm|very\\scold\\s)\\b(\\sin\\s)\\b(?<city>[a-zA-z]+\\s+[a-zA-z]*?\\s?)\\b(?<time>tomorrow|today|the\\sday\\safter\\stomorrow)\\s*\\??$",
    intent : "weather assertion"
}];
module.exports = patternDict;