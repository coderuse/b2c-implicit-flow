# AAD B2C Authentication With Implicit Flow

[coderuse.github.io/b2c-implicit-flow/](https://coderuse.github.io/b2c-implicit-flow/)

### Overview

This is an over-simplified implementation of acquiring [access token](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-reference-tokens) [authenticating](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-apps) [Azure Active Directory B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-overview) with implicit flow defined in [Rfc-6749](https://tools.ietf.org/html/rfc6749#section-4.2).

### Background

Starting from 5th October, 2018, Azure has made `b2clogin.com` [generally available](https://blogs.msdn.microsoft.com/azureadb2c/2018/10/05/b2clogin-com-is-now-generally-available/), and they have [added one document](https://docs.microsoft.com/en-us/azure/active-directory-b2c/b2clogin) to use the new end point. But it does not talk about the most needed url to get configuration for a policy for a b2c application. Only from a [GitHub Issue](https://github.com/MicrosoftDocs/azure-docs/issues/16505#issuecomment-429093676), I got to know the format is `https://tenant-name.b2clogin.com/tfp/tenant-ID/policy-name/v2.0/.well-known/openid-configuration`. I've used this in this app.

### How To Use

Tenant name, tenant id, [policy](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-reference-protocols#policies-and-user-flows), app id and required app permissions are needed to be filled in the [page](https://coderuse.github.io/b2c-implicit-flow/). `id_token token` is used as response type to acquire access token with a single redirection. The acquired access token will be shown in the text-box. On a single click on the box, the token will be copied to clipboard for convenience.

### License

All the code presented are licensed, unless otherwise notified/stated, under [Apache-2.0](./LICENSE),

```
Copyright 2018 Arnab Das <arnab@coderuse.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

All the documents, tutorials here are licensed, unless otherwise notified/stated, under [GNU Free Documentation License](https://www.gnu.org/licenses/fdl-1.3.en.html)

```
Copyright (C)  2018 to present  Arnab Das <arnab@coderuse.com>.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.3
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License".
```
and [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/)
