"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const [password, setPassword] = useState("");
  const [authedPath, setAuthedPath] = useState<string | null>(null);
  const [checkedPath, setCheckedPath] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  // Route enabled/protected status is pure config lookup, so derive it
  // synchronously. Doing it in an effect (with a loader in between) unmounted
  // the page on every navigation and on first render, so content — and its
  // fade-in animations — only started after a loader flash.
  const localeStrippedPath = (pathname ?? "").replace(/^\/(en|sv)(?=\/|$)/, "") || "/";
  const isRouteEnabled = (() => {
    if (!pathname) return false;
    if (localeStrippedPath in routes) {
      return routes[localeStrippedPath as keyof typeof routes];
    }
    const dynamicRoutes = ["/blog", "/cases"] as const;
    return dynamicRoutes.some((route) => localeStrippedPath.startsWith(route) && routes[route]);
  })();
  const isPasswordRequired = !!protectedRoutes[localeStrippedPath as keyof typeof protectedRoutes];
  const isAuthenticated = authedPath === localeStrippedPath;
  // Only protected routes need an async check, so only they show a loader.
  const loading = isPasswordRequired && checkedPath !== localeStrippedPath;

  useEffect(() => {
    if (!isPasswordRequired) return;
    let cancelled = false;
    fetch("/api/check-auth")
      .then((response) => {
        if (cancelled) return;
        if (response.ok) setAuthedPath(localeStrippedPath);
        setCheckedPath(localeStrippedPath);
      })
      .catch(() => {
        if (!cancelled) setCheckedPath(localeStrippedPath);
      });
    return () => {
      cancelled = true;
    };
  }, [isPasswordRequired, localeStrippedPath]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setAuthedPath(localeStrippedPath);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <div className="loader" />
      </Flex>
    );
  }

  if (!isRouteEnabled) {
    return <NotFound />;
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
