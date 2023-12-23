# 第一响应者轮换

我们有一个称为第一响应者轮换的制度，即 FRR。该轮换的目标是：

1. 确保社区的问题和PR能够及时得到回复。
2. 确保支持负担在整个团队中得到分享。
3. 释放整个团队专注于里程碑工作。
4. 让每个人都能够定期从里程碑工作中休息。

每个轮换周期为一周。在担任第一响应者期间，您的主要职责是：

1. 对问题进行分类。
    * 当前的第一响应者不负责跟进之前第一响应者留下的仍然未解决的问题。但是，他们应该向团队突出显示至少有 5 天未得到前一位响应者回答的问题，以增加可见性并可能指出哪些是最高优先级的。
    * 在问题上提及 @desktop/support 并添加 `support` 标签，如果问题只涉及到报告问题的用户，并且不是更广泛相关的问题。
    * 确保准确标记问题。
    * 查看标记为 [`reviewer-needs-to-reproduce`](https://github.com/desktop/desktop/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+sort%3Aupdated-asc+label%3Areviewer-needs-to-reproduce) 的问题，并在最后一位评审员的最后一次提问后两周内无新活动的问题上关闭。
    * 查看标记为 [`more-information-needed`](https://github.com/desktop/desktop/issues?q=is%3Aopen+is%3Aissue+label%3Amore-information-needed+sort%3Aupdated-asc) 的问题，并在填写问题模板后 7 天无回应的情况下关闭。否则，`no-response` 机器人将在 2 周后关闭它。
    * 更多关于我们问题分类流程的信息，请参阅 [issue-triage.md](issue-triage.md)。
2. 检查社区的 Pull Request 并标记那些已经 `ready-for-review` 的。

一旦这些任务完成，您可以自由支配您的时间，解决项目中自己感兴趣的问题。真的想重构那个庞大的组件吗？去做吧！想要修复那个让你讨厌的错误吗？去做吧！想要升级所有的依赖关系吗？你真是个了不起的 masochist！

尽管如此，通常需要设计工作的任务 *不太* 适合这个角色。这会让我们出色的设计师远离里程碑工作，并且在一周的时间内难以完成。

如果您对想法感到困惑，或者想知道某事是否适合第一响应者任务，请询问团队的其他成员！或者浏览 [`tech-debt`](https://github.com/desktop/desktop/labels/tech-debt) 标签以获取一些灵感。
