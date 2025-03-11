"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { markMessageAsRead } from "@/lib/actions";

interface DashboardMessagesProps {
  messages: any[];
  currentUserId: string;
}

export function DashboardMessages({
  messages,
  currentUserId,
}: DashboardMessagesProps) {
  const [readMessages, setReadMessages] = useState<Set<string>>(new Set());

  if (messages.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-muted-foreground">No messages yet.</p>
        </CardContent>
      </Card>
    );
  }

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await markMessageAsRead(messageId);
      setReadMessages((prev) => new Set(prev).add(messageId));
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Messages</h2>

      <div className="space-y-4">
        {messages.map((message) => {
          const isIncoming =
            message.internship.student.id === currentUserId &&
            message.sender.id !== currentUserId;
          const isUnread =
            isIncoming && !message.isRead && !readMessages.has(message.id);

          return (
            <Card key={message.id} className={isUnread ? "border-primary" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">
                      {isIncoming
                        ? "Message about your internship"
                        : "Your message about an internship"}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {isIncoming
                        ? `From: ${message.sender.name}`
                        : `To: ${message.internship.student.name}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isUnread && <Badge variant="default">New</Badge>}
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(message.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-muted p-3 rounded-md">
                    <p className="whitespace-pre-line">{message.content}</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Regarding:</p>
                    <p>{message.internship.subject}</p>
                    <p className="text-muted-foreground">
                      {message.internship.company}
                    </p>
                  </div>

                  {isUnread && (
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsRead(message.id)}
                      >
                        Mark as Read
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
