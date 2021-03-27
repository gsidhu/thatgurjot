library(ggplot2)
library(svglite)

df <- read.csv("/Users/thatgurjot/Git Repos/thatgurjot/labs/india-schools/world_school_data.csv")

df$plot.school <- df$schools / 1000
df$plot.school.pop <- df$school.per.pop * 1000
df$plot.school.youth <- df$school.per.youth * 1000
df$plot.school.density <- df$school.density

p <- ggplot(data=df, aes(x=code, y=plot.school.youth, fill=flag)) + geom_bar(stat="identity", width = .5)
p <- p + xlab("") + ylab("Schools per 1000 youth")
p <- p + geom_text(aes(label=round(plot.school.youth,2)), vjust=-0.3, color='black', size=3.5)
p <- p + scale_fill_brewer(palette="Spectral") + theme_minimal()
p <- p + theme(legend.position="none")
p

ggsave(filename="world-school-youth.svg", plot=p, width=10, height=8)